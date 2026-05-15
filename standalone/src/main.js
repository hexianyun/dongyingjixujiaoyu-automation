import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';
import { SHELL_HTML, shellUpdate, shellReadCmd } from './shell.js';

let stopRequested = false;
let phase = 'idle';
let running = false;
const logBuffer = [];
let shellPage = null;
let cmdPollTimer = null;

function pushShell(data) {
  if (shellPage && !shellPage.isClosed()) {
    shellPage.evaluate(shellUpdate(data)).catch(() => {});
  }
}

function getLearningFrame() {
  if (!shellPage || shellPage.isClosed()) return null;
  const frames = shellPage.frames();
  for (const f of frames) {
    const url = f.url();
    if (url.includes('yxlearning') || url.includes('baijiayun') || url.includes('sddy.gxk')) return f;
  }
  return frames.find(f => f !== shellPage.mainFrame()) || null;
}

async function navigateTo(url) {
  pushShell({ iframeUrl: url });
  for (let i = 0; i < 45; i++) {
    await sleep(1000);
    const frame = getLearningFrame();
    if (frame) {
      const frameUrl = frame.url();
      if (frameUrl !== 'about:blank' && frameUrl !== '') return frame;
    }
  }
  return getLearningFrame();
}

// Start polling for commands from the shell sidebar
function startCmdPolling() {
  if (cmdPollTimer) clearInterval(cmdPollTimer);
  cmdPollTimer = setInterval(async () => {
    if (!shellPage || shellPage.isClosed()) return;
    try {
      const cmd = await shellPage.evaluate(shellReadCmd()).catch(() => null);
      if (cmd && typeof cmd === 'object' && cmd.action === 'navigate' && cmd.value) {
        await navigateTo(cmd.value);
      } else if (cmd === 'start' && !running) {
        startRunning();
        setPhase('login', '等待登录...');
        log('收到开始指令');
        startCmdReceived = true;
      } else if (cmd === 'stop' && running) {
        log('收到停止请求，将在当前任务完成后停止...', 'warn');
        stopRunning();
      }
    } catch {}
  }, 500);
}
let startCmdReceived = false;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
// Detect if running as packaged EXE (pkg)
const IS_PACKAGED = typeof process.pkg !== 'undefined';
// When packaged, use the EXE's directory for external files (Chromium, profile)
const EXE_DIR = IS_PACKAGED ? path.dirname(process.execPath) : ROOT;
const BASE_URL = normalizeHttpBaseUrl(process.env.BASE_URL || 'http://sddy.gxk.yxlearning.com');
const PROFILE_DIR = process.env.PROFILE_DIR || (IS_PACKAGED
  ? path.join(EXE_DIR, '.profile')
  : path.join(ROOT, '.profile'));
const TRACE_PROGRESS = ['1', 'true', 'yes'].includes(String(process.env.TRACE_PROGRESS || '').toLowerCase());
const TRACE_DIR = path.join(EXE_DIR, 'traces');
const EXAM_CAPTURE_DIR = path.join(EXE_DIR, 'exam-captures');
const EXAMS_ONLY = ['1', 'true', 'yes'].includes(String(process.env.EXAMS_ONLY || '').toLowerCase());
const AUTO_CONTINUE = ['1', 'true', 'yes'].includes(String(process.env.AUTO_CONTINUE || '').toLowerCase());
const ALLOW_EXAM_SUBMIT = ['1', 'true', 'yes'].includes(String(process.env.ALLOW_EXAM_SUBMIT || '').toLowerCase());
const CHROMIUM_EXECUTABLE = String(process.env.CHROMIUM_EXECUTABLE || '').trim();
const PROXY_SERVER = normalizeProxyServer(process.env.PROXY_SERVER);
const examResponseCache = [];

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function checkStop() {
  return stopRequested;
}

function setPhase(p, msg) {
  phase = p;
  const badgePhases = { idle: 'idle', login: 'login', learning: 'learning', exams: 'exams', done: 'done', stopping: 'stopping' };
  pushShell({ phase: badgePhases[p] || p, running, message: sanitizeUiText(msg || ''), courses: lastCourses, exams: lastExams, done: lastDone });
}

let lastCourses = '--', lastExams = '--', lastDone = '--';
function setCourses(total, completed, current) {
  lastCourses = current ? `${completed}/${total} 门 | ${current}` : `${completed}/${total} 门`;
  pushShell({ courses: lastCourses });
}
function setExams(total, pending, completed) {
  lastExams = `${pending} 个`;
  lastDone = `${completed} 项`;
  pushShell({ exams: lastExams, done: lastDone });
}

function startRunning() {
  running = true;
  pushShell({ running: true });
}

function stopRunning() {
  running = false;
  stopRequested = true;
  pushShell({ running: false, phase: 'stopping', message: '正在停止...' });
}

function log(message, level) {
  const time = new Date().toLocaleTimeString();
  const cleanMessage = sanitizeUiText(message);
  console.log(`[${time}] ${cleanMessage}`);
  const entry = { time, text: cleanMessage, level: level || 'info' };
  logBuffer.push(entry);
  if (logBuffer.length > 200) logBuffer.shift();
  pushShell({ log: entry });
}

function sanitizeUiText(value) {
  const text = String(value || '');
  if (text.includes('鐐瑰嚮') || text.includes('寮€濮嬩换鍔')) return '点击“开始学习”启动自动学习';
  if (text.includes('绛夊緟渚ц竟') || text.includes('鎸囦护')) return '等待右侧控制面板的开始指令...';
  if (text.includes('鑷姩妯')) return '自动模式: 等待登录...';
  if (text.includes('姝ｅ湪鐧') || text.includes('璐﹀彿')) return '请在左侧浏览器中登录账号...';
  if (text.includes('宸插仠')) return '已停止';
  if (text.includes('鎵€鏈変换')) return '所有任务已完成';
  if (text.includes('璁块棶鍦板潃')) return text.replace(/^.*?:\s*/, '访问地址: ');
  if (text.includes('浣跨敤浠ｇ悊')) return text.replace(/^.*?:\s*/, '使用代理: ');
  return text;
}

// UI-facing overrides keep the desktop panel readable even if older log text below is garbled.
startCmdPolling = function() {
  if (cmdPollTimer) clearInterval(cmdPollTimer);
  cmdPollTimer = setInterval(async () => {
    if (!shellPage || shellPage.isClosed()) return;
    try {
      const cmd = await shellPage.evaluate(shellReadCmd()).catch(() => null);
      if (cmd && typeof cmd === 'object' && cmd.action === 'navigate' && cmd.value) {
        await navigateTo(cmd.value);
      } else if (cmd === 'start' && !running) {
        stopRequested = false;
        startRunning();
        setPhase('login', '等待登录...');
        log('收到开始指令');
        startCmdReceived = true;
      } else if (cmd === 'stop' && running) {
        log('收到停止请求，将在当前任务完成后停止...', 'warn');
        stopRunning();
      }
    } catch {}
  }, 500);
};

setCourses = function(total, completed, current) {
  lastCourses = current ? `${completed}/${total} 门 | ${current}` : `${completed}/${total} 门`;
  pushShell({ courses: lastCourses });
};

setExams = function(total, pending, completed) {
  lastExams = `${pending} 门`;
  lastDone = `${completed} 门`;
  pushShell({ exams: lastExams, done: lastDone });
};

stopRunning = function() {
  running = false;
  stopRequested = true;
  pushShell({ running: false, phase: 'stopping', message: '正在停止...' });
};

function normalizeHttpBaseUrl(value) {
  const raw = String(value || '').trim() || 'http://sddy.gxk.yxlearning.com';
  const withScheme = /^[a-z]+:\/\//i.test(raw) ? raw : `http://${raw}`;
  const url = new URL(withScheme);
  url.protocol = 'http:';
  url.pathname = url.pathname.replace(/\/+$/, '');
  url.search = '';
  url.hash = '';
  return url.toString().replace(/\/$/, '');
}

function normalizeProxyServer(value) {
  const raw = String(value || '').trim();
  if (!raw) return undefined;
  return raw.replace(/^socks5h:\/\//i, 'socks5://');
}

async function installIframeHeaderBypass(context) {
  await context.route(/^https?:\/\//i, async route => {
    try {
      const response = await route.fetch();
      const headers = response.headers();
      delete headers['x-frame-options'];
      delete headers['content-security-policy'];
      delete headers['content-security-policy-report-only'];
      await route.fulfill({
        response,
        headers,
        body: await response.body()
      });
    } catch {
      await route.continue().catch(() => {});
    }
  });
}

async function main() {
  const executablePath = await resolveChromiumExecutablePath();
  const args = [
    '--app=data:text/html,<title>Dongying Helper</title>',
    '--window-size=1450,820',
    '--autoplay-policy=no-user-gesture-required',
    '--mute-audio',
    '--no-sandbox',
    '--disable-background-timer-throttling',
    '--disable-renderer-backgrounding',
    '--disable-features=CalculateNativeWinOcclusion'
  ];
  if (PROXY_SERVER) {
    args.push('--proxy-bypass-list=sddy.gxk.yxlearning.com,*.yxlearning.com,*.baijiayun.com');
  }
  if (process.env.HOST_RESOLVER_RULES) {
    args.push(`--host-resolver-rules=${process.env.HOST_RESOLVER_RULES}`);
  }

  const context = await chromium.launchPersistentContext(PROFILE_DIR, {
    headless: false,
    viewport: null,
    bypassCSP: true,
    executablePath,
    args,
    proxy: PROXY_SERVER ? { server: PROXY_SERVER } : undefined
  });

  const page = context.pages()[0] || await context.newPage();
  shellPage = page;
  page.setDefaultTimeout(15000);
  await installIframeHeaderBypass(context);

  // Set the page content to our app shell (sidebar + iframe)
  const startPath = EXAMS_ONLY ? '/my/exam' : '/login';
  await page.setContent(SHELL_HTML, { waitUntil: 'domcontentloaded' });
  // Init sidebar state
  pushShell({ logs: logBuffer, running: false });
  setPhase('idle', '点击"开始任务"启动自动学习');

  // Start command polling
  startCmdPolling();

  // Attach tracing on the main page (captures all frames)
  if (TRACE_PROGRESS) await attachProgressTrace(page);
  await attachExamNetworkTrace(page);

  // Capture console from all frames for DIAG
  page.on('console', msg => {
    const text = msg.text();
    if (/^\[DIAG\]|^\[CLICK\]|^\[MATCH\]|^\[OPTION\]/.test(text)) {
      console.log(`  [PAGE] ${text}`);
    }
  });

  log(`访问地址: ${BASE_URL}/login`);
  if (PROXY_SERVER) log(`使用代理: ${PROXY_SERVER}`);
  log(`Chromium: ${executablePath || chromium.executablePath()}`);
  if (EXAMS_ONLY && !ALLOW_EXAM_SUBMIT) log('Exam submit disabled');

  // Wait for user to click "Start" in the sidebar
  if (!AUTO_CONTINUE) {
    log('等待侧边栏"开始"指令...');
    while (!startCmdReceived && !stopRequested) await sleep(500);
  } else {
    startRunning();
    setPhase('login', '自动模式: 等待登录...');
  }
  if (checkStop()) { setPhase('idle', '已停止'); return; }

  // Navigate the real browser page to login/exam page.
  await navigateTo(`${BASE_URL}${startPath}`);
  startRunning();

  // Wait for login (auto-detect)
  setPhase('login', '正在登录，请在右侧页面中输入账号密码...');
  await waitForLoginIfNeeded(getLearningFrame());
  if (checkStop()) { setPhase('idle', '已停止'); return; }

  if (EXAMS_ONLY) {
    await checkOnlineExams(page);
  } else {
    await runLearning(page);
  }

  if (!stopRequested) {
    setPhase('done', '所有任务已完成');
    pushShell({ running: false });
  } else {
    setPhase('idle', '已停止');
    pushShell({ running: false });
  }
}

async function resolveChromiumExecutablePath() {
  const candidates = [];
  if (CHROMIUM_EXECUTABLE) candidates.push(CHROMIUM_EXECUTABLE);

  // When packaged, look for Chromium next to the EXE first
  if (IS_PACKAGED) {
    candidates.push(
      path.join(EXE_DIR, 'chromium', 'chrome.exe'),
      path.join(EXE_DIR, 'chromium', 'chrome-win64', 'chrome.exe'),
    );
  }

  // Standard development locations
  candidates.push(
    path.join(ROOT, '.local-browsers', 'chromium-1223', 'chrome-win64', 'chrome.exe'),
    path.join(ROOT, 'node_modules', 'playwright-core', '.local-browsers', 'chromium-1223', 'chrome-win64', 'chrome.exe'),
    path.join(ROOT, 'node_modules', 'playwright', '.local-browsers', 'chromium-1223', 'chrome-win64', 'chrome.exe')
  );

  for (const candidate of candidates) {
    if (await fileExists(candidate)) return candidate;
  }
  return undefined;
}

async function fileExists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

async function attachProgressTrace(page) {
  await fs.mkdir(TRACE_DIR, { recursive: true });
  const traceFile = path.join(TRACE_DIR, `progress-${new Date().toISOString().replace(/[:.]/g, '-')}.jsonl`);
  const interesting = /progress|study|learn|heart|time|record|watch|finish|video|course|lesson|log|save|update|play|exam|paper|submit|answer/i;

  const append = async item => {
    await fs.appendFile(traceFile, `${JSON.stringify({ at: new Date().toISOString(), ...item })}\n`, 'utf8').catch(() => {});
  };

  page.on('request', async request => {
    const url = request.url();
    if (!interesting.test(url)) return;
    await append({
      type: 'request',
      method: request.method(),
      url,
      postData: summarizeText(request.postData() || '')
    });
  });

  page.on('response', async response => {
    const request = response.request();
    const url = response.url();
    if (!interesting.test(url)) return;
    const video = await readBestVideoState(page).catch(() => null);
    const text = await response.text().catch(() => '');
    await append({
      type: 'response',
      method: request.method(),
      url,
      status: response.status(),
      video,
      body: summarizeText(text)
    });
  });

  log(`进度观测已开启: ${traceFile}`);
}

function summarizeText(text) {
  const normalized = String(text || '').replace(/\s+/g, ' ').trim();
  return normalized.length > 800 ? `${normalized.slice(0, 800)}...` : normalized;
}

async function attachExamNetworkTrace(page) {
  await fs.mkdir(EXAM_CAPTURE_DIR, { recursive: true });
  const traceFile = path.join(EXAM_CAPTURE_DIR, `network-${new Date().toISOString().replace(/[:.]/g, '-')}.jsonl`);
  const interesting = /exam|paper|question|answer|submit|test|record|train|cms/i;
  const append = async item => {
    await fs.appendFile(traceFile, `${JSON.stringify({ at: new Date().toISOString(), ...item })}\n`, 'utf8').catch(() => {});
  };

  page.on('request', async request => {
    const url = request.url();
    if (!interesting.test(url)) return;
    await append({
      type: 'request',
      resourceType: request.resourceType(),
      method: request.method(),
      url: redactUrl(url),
      postBytes: Buffer.byteLength(request.postData() || '', 'utf8')
    });
  });

  page.on('response', async response => {
    const url = response.url();
    if (!interesting.test(url)) return;
    const contentType = response.headers()['content-type'] || '';
    const body = /json|javascript|text/i.test(contentType)
      ? await response.text().catch(() => '')
      : '';
    rememberExamResponse({
      url,
      status: response.status(),
      contentType,
      body
    });
    await append({
      type: 'response',
      resourceType: response.request().resourceType(),
      method: response.request().method(),
      url: redactUrl(url),
      status: response.status(),
      contentType
    });
  });

  log(`Exam network trace enabled: ${traceFile}`);
}

function redactUrl(value) {
  try {
    const url = new URL(value);
    for (const key of [...url.searchParams.keys()]) {
      if (/token|ticket|session|cookie|auth|password|secret|answer/i.test(key)) {
        url.searchParams.set(key, '[redacted]');
      }
    }
    return url.toString();
  } catch {
    return String(value || '');
  }
}

async function runLearning(page) {
  log('===== 阶段1: 自动学习课程视频 =====', 'phase');
  setPhase('learning', '正在学习课程视频...');

  while (true) {
    if (checkStop()) { log('停止: 用户中断学习', 'warn'); return; }

    await ensureLearningPage(page);
    const allCards = await getLearningFrame().locator('.col-xs-12.col-sm-12.col-md-6.col-lg-4').all();
    let totalCourses = allCards.length;
    let completedCourses = 0;
    if (totalCourses > 0) {
      for (const card of allCards) {
        const progressText = await textOf(card.locator('.sr-only').first());
        const barStyle = await card.locator('.progress-bar').first().getAttribute('style').catch(() => '');
        const progress = parseProgress(progressText || barStyle || '');
        if (progress >= 100) completedCourses++;
      }
      setCourses(totalCourses, completedCourses, '');
    }

    const course = await findFirstIncompleteCourse(page);
    if (!course) {
      log('所有课程视频已完成，进入考试阶段');
      log('===== 阶段2: 在线考试 =====', 'phase');
      await checkOnlineExams(page);
      log('===== 全部任务完成 =====', 'phase');
      return;
    }

    log(`进入课程: ${course.title} (进度 ${course.progress}%)`);
    setCourses(totalCourses, completedCourses, course.title);
    await course.locator.click({ force: true });
    await waitForCoursePage(page);
    await playCourseVideos(page);

    if (checkStop()) { log('停止: 用户中断学习', 'warn'); return; }

    await navigateTo(`${BASE_URL}/my/learning`);
    await sleep(2000);
  }
}

async function ensureLearningPage(page) {
  if (!getLearningFrame().url().includes('/my/learning')) {
    await navigateTo(`${BASE_URL}/my/learning`);
  }
  await getLearningFrame().waitForLoadState('domcontentloaded').catch(() => {});
  await sleep(2000);
}

async function checkOnlineExams(page) {
  log('进入在线考试页面');
  setPhase('exams', '正在进入考试页面...');
  await navigateTo(`${BASE_URL}/my/exam`).catch(err => {
    log(`Exam page navigation interrupted: ${err.message}`);
  });
  await waitForLoginIfNeeded(page);
  if (!getLearningFrame().url().includes('/my/exam')) {
    await navigateTo(`${BASE_URL}/my/exam`).catch(err => {
      log(`Exam page navigation failed after login: ${err.message}`);
    });
  }
  await getLearningFrame().waitForLoadState('domcontentloaded').catch(() => {});
  await sleep(2000);

  const pendingTab = getLearningFrame().locator('[du-click="pendingexambtn"]').first();
  if (await pendingTab.count().catch(() => 0)) {
    await pendingTab.click({ force: true }).catch(() => {});
    await sleep(1000);
  }

  const summary = await readPendingExamSummary(page);
  log(`待参加考试数量: ${summary.pendingCount}`);

  // Report exam stats to control panel
  setExams(summary.exams.length, summary.pendingCount, 0);
  setPhase('exams', `共 ${summary.exams.length} 个考试，${summary.pendingCount} 个待考`);

  if (!summary.exams.length) {
    await logPageState(page, 'no exams found');
    log('没有待考试科目');
    return;
  }

  for (let index = 0; index < summary.exams.length; index++) {
    const exam = summary.exams[index];
    log(`待考 ${index + 1}/${summary.exams.length}: ${exam.title} | 状态 ${exam.status || '-'} | 次数 ${exam.attempts || '-'} | 成绩 ${exam.score || '-'}`);
  }

  if (!ALLOW_EXAM_SUBMIT) {
    log('提示: 考试提交未启用，设置 ALLOW_EXAM_SUBMIT=1 可自动提交考试');
  }

  await processPendingExams(page);
}

async function readPendingExamSummary(page) {
  return getLearningFrame().evaluate(() => {
    const text = el => (el?.textContent || '').replace(/\s+/g, ' ').trim();
    const pendingCountText = text(document.querySelector('[du-html="pendingexam"], .text-blue'));
    const pendingCount = Number.parseInt(pendingCountText, 10) || 0;

    const rows = [...document.querySelectorAll('#joined tbody tr, table.table tbody tr')]
      .filter(row => text(row).includes('待考试') || row.querySelector('button[btn-name="toExam"]'));

    const exams = rows.map(row => {
      const cells = [...row.querySelectorAll('td')];
      const titleEl = row.querySelector('.title[title], .ellipsis-2[title], .orderright .title');
      const title = titleEl?.getAttribute('title') || text(titleEl) || text(cells[0]);
      return {
        title,
        deadline: text(cells[1]),
        status: text(cells[2]),
        attempts: text(cells[3]),
        score: text(cells[4]),
        canEnter: !!row.querySelector('button[btn-name="toExam"]')
      };
    }).filter(item => item.title);

    return {
      pendingCount: pendingCount || exams.length,
      exams
    };
  }).catch(() => ({ pendingCount: 0, exams: [] }));
}

async function waitForLoginIfNeeded(page) {
  const isLoginPage = async () => getLearningFrame().evaluate(() => {
    const text = document.body?.innerText || '';
    return location.href.includes('/login') || /登录|鐧诲綍/.test(text);
  }).catch(() => getLearningFrame().url().includes('/login'));

  if (!(await isLoginPage())) return;

  log('Login required: waiting for manual login in the opened Chromium window');
  const startedAt = Date.now();
  while (Date.now() - startedAt < 10 * 60 * 1000) {
    await sleep(3000);
    if (!(await isLoginPage())) {
      log(`Login detected: ${getLearningFrame().url()}`);
      return;
    }
  }

  throw new Error('Timed out waiting for login');
}

async function logPageState(page, reason) {
  const state = await getLearningFrame().evaluate(() => ({
    title: document.title,
    url: location.href,
    text: document.body?.innerText?.replace(/\s+/g, ' ').trim().slice(0, 500) || ''
  })).catch(err => ({
    title: '',
    url: getLearningFrame().url(),
    text: `evaluate failed: ${err.message}`
  }));
  log(`Page state (${reason}): url=${state.url} title=${state.title} text=${state.text}`);
}

async function waitForExamApiData(page) {
  const parsed = new URL(getLearningFrame().url());
  const myExamRecordId = parsed.searchParams.get('myExamRecordId');
  for (let retry = 0; retry < 90; retry++) {
    if (/paperId=/.test(getLearningFrame().url())) return true;
    const found = examResponseCache.some(item =>
      /start-do-paper-or-test/i.test(item.url || '')
      && item.json != null
      && item.answerPlanSize > 0
      && (!myExamRecordId || item.url?.includes(myExamRecordId))
    );
    if (found) return true;
    await sleep(1000);
  }
  return false;
}

async function processPendingExams(page) {
  let completed = 0;
  const processedTitles = new Set();

  while (true) {
    if (checkStop()) { log('停止: 用户中断考试', 'warn'); return; }

    await navigateTo(`${BASE_URL}/my/exam`);
    await getLearningFrame().waitForLoadState('domcontentloaded').catch(() => {});
    await sleep(1500);

    const pendingTab = getLearningFrame().locator('[du-click="pendingexambtn"]').first();
    if (await pendingTab.count().catch(() => 0)) {
      await pendingTab.click({ force: true }).catch(() => {});
      await sleep(1000);
    }

    const exam = await getFirstEnterableExam(page, processedTitles);
    if (!exam) {
      log(`Exam processing finished, submitted ${completed} exam(s) this run`);
      setExams(processedTitles.size, 0, completed);
      return;
    }

    completed++;
    log(`Entering formal exam ${completed}: ${exam.title}`);
    setExams(processedTitles.size + 1, Math.max(0, (processedTitles.size + 1) - completed + 1), completed - 1);
    setPhase('exams', `正在答题: ${exam.title}`);
    await exam.button.click({ force: true });
    await sleep(2500);
    await enterFormalExam(page);
    const ready = await waitForExamReady(page);
    if (!ready) {
      await logPageState(page, 'exam not ready; skip answer');
      log('Exam not ready: no paperId or visible exam options detected');
      processedTitles.add(exam.title);
      continue;
    }

    const apiReady = await waitForExamApiData(page);
    if (!apiReady) {
      await logPageState(page, 'exam api data timeout');
      log('Exam API data did not arrive within timeout; skip');
      processedTitles.add(exam.title);
      continue;
    }

    const capture = await captureCurrentExam(page);
    const pageSummary = await inspectCurrentExam(page);
    let answerPlan = extractAnswerPlan(capture.api);
    if (!answerPlan.length) {
      answerPlan = buildFallbackAnswerPlan(capture.api);
      if (answerPlan.length) {
        log(`Using fallback answer plan (API has no correct answers): ${answerPlan.length} questions`);
      }
    }
    log(`Captured paper: ${capture.apiUrl || 'no api url'} | dom questions ${capture.domQuestions.length} | visible questions ${pageSummary.questions} | options ${pageSummary.options} | selected ${pageSummary.selected} | answer plan ${answerPlan.length}`);
    // Log answer plan detail (question text + correct answers)
    for (let ai = 0; ai < answerPlan.length; ai++) {
      const item = answerPlan[ai];
      const correctTexts = (item.correct || []).map(c => (c.text || c.id || '').slice(0, 40)).join(' | ');
      const multiTag = (item.correct?.length || 0) > 1 ? ' [多选]' : '';
      log(`  Plan Q${ai+1}: "${(item.text || '').slice(0, 60)}" -> [${correctTexts}]${multiTag}`);
    }
    if (!ALLOW_EXAM_SUBMIT) {
      await logPageState(page, 'diagnostic capture complete; skip submit');
      log('Submit skipped: ALLOW_EXAM_SUBMIT is not enabled');
      processedTitles.add(exam.title);
      continue;
    }
    if (!answerPlan.length) {
      await logPageState(page, 'no answer plan available; skip submit');
      log('Submit skipped: failed to extract answers from runtime payload');
      processedTitles.add(exam.title);
      continue;
    }

    const answerResult = await answerExamMultiPass(page, answerPlan);
    log(`Multi-pass answer: apiMatched=${answerResult.totalApiMatched} fallback=${answerResult.totalFallback} clicked=${answerResult.totalClicked}`);
    // Wait for AngularJS digest to process clicks
    await sleep(1500);
    const completion = await inspectAnswerCompletionByPlan(page, answerPlan);
    const pct = answerPlan.length ? Math.round(completion.answered / answerPlan.length * 100) : 0;
    log(`Answer completion: questions=${completion.questions}, answered=${completion.answered}, unanswered=${completion.unanswered} (planSize=${answerPlan.length}) -> ${pct}%`);
    // Diagnostic: read and log selected states in Node.js
    const diagStates = await getLearningFrame().evaluate(() => {
      const allOpts = [...document.querySelectorAll('ul.options')];
      return allOpts.map((opt, idx) => {
        const lis = [...opt.querySelectorAll('li')];
        return lis.map(li => ({
          text: (li.textContent || '').trim().slice(0, 60),
          cls: li.className,
          liVal: li.getAttribute('li-value') || '',
          liAnswer: li.getAttribute('li-is-answer') || '',
          aria: li.getAttribute('aria-checked') || ''
        }));
      });
    }).catch(() => []);
    for (let qi = 0; qi < diagStates.length; qi++) {
      const lis = diagStates[qi];
      const selIdx = lis.findIndex(li => /active|selected|checked|choosed/i.test(li.cls));
      log(`[DIAG] Q${qi+1}: sel=${selIdx} ${lis.map(li => `[${li.cls.slice(0,20)}|${li.liAnswer}|${li.text.slice(0,30)}]`).join(' ')}`);
    }
    if (completion.answered < answerPlan.length * 0.5) {
      await logPageState(page, `only ${pct}% answered; skip submit`);
      log(`Submit skipped: only ${completion.answered}/${answerPlan.length} questions answered (${pct}%)`);
      continue;
    }
    if (pct < 100) {
      log(`Submitting with ${completion.answered}/${answerPlan.length} answers (${pct}%) — some questions may be unanswered`);
    }

    await submitCurrentExam(page);
    await sleep(2000);
    const finalState = await inspectCurrentExam(page);
    log(`Post-submit page state: questions=${finalState.questions}, options=${finalState.options}, selected=${finalState.selected}`);
    processedTitles.add(exam.title);
  }
}

async function getFirstEnterableExam(page, skipTitles) {
  const rows = await getLearningFrame().locator('#joined tbody tr, table.table tbody tr').all();
  for (const row of rows) {
    if (!await row.isVisible().catch(() => false)) continue;
    const info = await row.evaluate(el => {
      const text = node => (node?.textContent || '').replace(/\s+/g, ' ').trim();
      const cells = [...el.querySelectorAll('td')];
      const titleEl = el.querySelector('.title[title], .ellipsis-2[title], .orderright .title');
      return {
        title: titleEl?.getAttribute('title') || text(titleEl) || text(cells[0]),
        status: text(cells[2]),
        hasEnterButton: !!el.querySelector('button[btn-name="toExam"]')
      };
    }).catch(() => null);
    if (!info?.hasEnterButton) continue;
    if (info.status && !/[\u5f85][\u8003][\u8bd5]|\u672a\u901a\u8fc7|\u4e0d\u53ca\u683c/.test(info.status)) continue;
    if (skipTitles.has(info.title)) continue;
    const visibleButtons = await row.locator('button[btn-name="toExam"]').all();
    const button = await firstVisibleLocator(visibleButtons);
    if (!button) continue;
    return {
      title: info.title || 'untitled exam',
      button
    };
  }
  return null;
}

async function firstVisibleLocator(locators) {
  for (const locator of locators) {
    if (await locator.isVisible().catch(() => false)) return locator;
  }
  return null;
}

async function enterFormalExam(page) {
  const goButton = getLearningFrame().locator('.btn-primary[du-click="goExam"], button[du-click="goExam"], button:has-text("进入考试")').first();
  if (await goButton.count().catch(() => 0) && await goButton.isVisible().catch(() => false)) {
    await goButton.click({ force: true });
    await getLearningFrame().waitForLoadState('domcontentloaded').catch(() => {});
    await sleep(3000);
  }

  for (let retry = 0; retry < 20; retry++) {
    if (/paperId=/.test(getLearningFrame().url())) return;
    const hasExamOptions = await getLearningFrame().locator('.questionDesc, .options, input[type="radio"], input[type="checkbox"]').count().catch(() => 0);
    if (hasExamOptions >= 2 && await getLearningFrame().locator('#commit-answer, .btn-submit, span[du-click="onsubmit"]').count().catch(() => 0)) return;
    await sleep(1000);
  }
}

async function waitForExamReady(page) {
  for (let retry = 0; retry < 45; retry++) {
    if (/paperId=/.test(getLearningFrame().url())) return true;
    const state = await getLearningFrame().evaluate(() => {
      const visible = el => {
        if (!el) return false;
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return r.width > 0 && r.height > 0 && cs.display !== 'none' && cs.visibility !== 'hidden';
      };
      const options = [...document.querySelectorAll('.questionDesc, .options, input[type="radio"], input[type="checkbox"]')].filter(visible);
      const submit = document.querySelector('#commit-answer, .btn-submit, span[du-click="onsubmit"]');
      const text = document.body?.innerText || '';
      const looksLikePaper = /试卷进度|答题卡|判断题|单选题|多选题|提交答案/.test(text);
      return { options: options.length, hasSubmit: !!submit, looksLikePaper };
    }).catch(() => ({ options: 0, hasSubmit: false }));
    if ((state.options >= 2 && state.hasSubmit) || (state.looksLikePaper && state.hasSubmit)) return true;
    await sleep(1000);
  }
  return false;
}

async function captureCurrentExam(page) {
  const currentUrl = getLearningFrame().url();
  const parsed = new URL(currentUrl);
  let paperId = parsed.searchParams.get('paperId');
  const myExamRecordId = parsed.searchParams.get('myExamRecordId');
  let apiUrl = '';
  let api = null;
  let apiError = null;

  if (paperId) {
    const apiEndpoint = new URL('/train/cms/paper/start-do-paper-or-test.gson', parsed.origin);
    apiEndpoint.searchParams.set('paperId', paperId);
    if (myExamRecordId) apiEndpoint.searchParams.set('myExamRecordId', myExamRecordId);
    apiUrl = apiEndpoint.toString();

    const response = await getLearningFrame().evaluate(async url => {
      const resp = await fetch(url, { credentials: 'include' });
      const body = await resp.text();
      return { status: resp.status, body };
    }, apiUrl).catch(err => ({ status: 0, body: '', error: err.message }));

    if (response.error) {
      apiError = response.error;
    } else {
      try {
        api = JSON.parse(response.body);
      } catch (err) {
        apiError = `JSON parse failed: ${err.message}`;
      }
      if (response.status < 200 || response.status >= 300) {
        apiError = `HTTP ${response.status}${apiError ? `; ${apiError}` : ''}`;
      }
    }
  }

  if (!api) {
    const cached = findCachedExamPayload({ paperId, myExamRecordId, pageUrl: currentUrl });
    if (cached?.json) {
      api = cached.json;
      apiUrl = cached.url;
      apiError = cached.note || null;
      paperId = paperId || cached.paperId || null;
    }
  }

  if (!api) {
    const runtime = await readExamRuntimePayload(page);
    if (runtime?.json) {
      api = runtime.json;
      apiUrl = runtime.url || apiUrl;
      apiError = runtime.note || null;
      paperId = paperId || runtime.paperId || null;
    }
  }

  if (!api && !apiError) {
    apiError = 'No answer-bearing exam payload found in URL-derived API, cached XHR, or page runtime';
  }

  const domQuestions = await readExamDomQuestions(page);
  const pageStructure = await capturePageStructure(page);
  const screenshotFile = `exam-${new Date().toISOString().replace(/[:.]/g, '-')}.png`;
  const screenshotPath = path.join(EXAM_CAPTURE_DIR, screenshotFile);
  await page.screenshot({ path: screenshotPath, fullPage: true }).catch(err => log(`Screenshot failed: ${err.message}`));
  log(`Screenshot saved: ${screenshotFile}`);
  const capture = {
    capturedAt: new Date().toISOString(),
    pageUrl: currentUrl,
    apiUrl,
    paperId,
    myExamRecordId,
    apiError,
    api,
    domQuestions,
    pageStructure,
    screenshotFile
  };
  await saveExamCapture(capture);
  return capture;
}

async function readExamDomQuestions(page) {
  return getLearningFrame().evaluate(() => {
    const clean = value => String(value || '').replace(/\s+/g, ' ').trim();
    const allOpts = [...document.querySelectorAll('ul.options')];
    return allOpts.map((optionsUL, index) => {
      // Find question text from preceding .questionDesc within same question LI
      const questionLi = optionsUL.closest('li.mb20, li.sub');
      const questionText = questionLi
        ? clean(questionLi.querySelector('.questionDesc')?.textContent || '').slice(0, 500)
        : optionsUL.previousElementSibling?.matches?.('.questionDesc')
          ? clean(optionsUL.previousElementSibling.textContent).slice(0, 500)
          : '';
      const optionEls = [...optionsUL.querySelectorAll('li')].map(el => clean(el.textContent));
      return { index: index + 1, text: questionText, options: optionEls.filter(Boolean) };
    }).filter(item => item.text || item.options.length);
  }).catch(() => []);
}

async function capturePageStructure(page) {
  return getLearningFrame().evaluate(() => {
    const clean = value => String(value || '').replace(/\s+/g, ' ').trim();
    const visible = el => {
      if (!el) return false;
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return r.width > 0 && r.height > 0 && cs.display !== 'none' && cs.visibility !== 'hidden';
    };

    // Dump stem tabs
    const tabContainers = [...document.querySelectorAll('[class*="tab"], [class*="stem"], [class*="nav"], [du-repeat*="stem"], [du-repeat*="questionStem"]')]
      .filter(visible);
    const tabs = tabContainers.length ? tabContainers : [
      ...document.querySelectorAll('li, a, span, div, button')
    ].filter(el => {
      const t = clean(el.innerText || el.textContent);
      return visible(el) && /判断|单选|多选/.test(t) && t.length < 40;
    });

    const tabInfo = tabs.slice(0, 30).map(el => ({
      tag: el.tagName,
      class: String(el.className || '').slice(0, 200),
      text: clean(el.innerText || el.textContent).slice(0, 200),
      rect: (() => { const r = el.getBoundingClientRect(); return { top: Math.round(r.top), left: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height) }; })()
    }));

    // Dump question containers
    const qContainers = [
      ...document.querySelectorAll('[du-repeat*="question"], [ng-repeat*="question"], [class*="question"], [class*="paper"], [class*="exam"], [class*="subject"], [class*="stem"]')
    ].filter(el => {
      if (!visible(el)) return false;
      const inner = el.innerText || el.textContent || '';
      return inner.length > 20 && inner.length < 5000 && !tabContainers.some(tc => tc.contains(el));
    }).slice(0, 40);

    const qInfo = qContainers.map(el => ({
      tag: el.tagName,
      class: String(el.className || '').slice(0, 200),
      text: clean(el.innerText || el.textContent).slice(0, 300)
    }));

    // Dump option elements
    const inputs = [...document.querySelectorAll('input[type="radio"], input[type="checkbox"]')].filter(visible);
    const optionEls = inputs.length ? inputs : [
      ...document.querySelectorAll('[class*="option"], [class*="answer"], [class*="choice"], label, [du-click*="select"], [du-click*="answer"], [ng-click*="select"]')
    ].filter(el => visible(el) && clean(el.innerText || el.textContent).length > 0 && clean(el.innerText || el.textContent).length < 500).slice(0, 60);

    const optionInfo = optionEls.map(el => ({
      tag: el.tagName,
      class: String(el.className || '').slice(0, 200),
      text: clean(el.innerText || el.textContent || el.value).slice(0, 200),
      type: el.type || '',
      checked: el.checked || false
    }));

    // Dump body-level section containers
    const sections = [...document.querySelectorAll('.panel, .section, .tab-content, .tab-pane, [class*="content"], [class*="body"], [class*="wrap"], [class*="area"]')]
      .filter(el => visible(el) && el.children.length >= 2)
      .slice(0, 20)
      .map(el => ({
        tag: el.tagName,
        class: String(el.className || '').slice(0, 200),
        childCount: el.children.length,
        text: clean(el.innerText || el.textContent).slice(0, 200)
      }));

    return { tabs: tabInfo, questions: qInfo, options: optionInfo, sections, bodyClasses: String(document.body?.className || '').slice(0, 300) };
  }).catch(err => ({ error: err.message }));
}

async function inspectCurrentExam(page) {
  return getLearningFrame().evaluate(() => {
    const visible = el => {
      if (!el) return false;
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return r.width > 0 && r.height > 0 && cs.display !== 'none' && cs.visibility !== 'hidden';
    };
    const questionDescs = [...document.querySelectorAll('.questionDesc')].filter(visible);
    const optionsULs = [...document.querySelectorAll('.options')].filter(visible);
    const selected = [...document.querySelectorAll('li.active, li.selected, li.checked, li.on, .active, .selected, .checked, .on')].filter(visible).length;
    const buttonTexts = [...document.querySelectorAll('button, a, span')]
      .filter(visible)
      .map(el => (el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim())
      .filter(Boolean)
      .slice(0, 80);
    const optionTexts = optionsULs
      .map(el => (el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim())
      .filter(Boolean)
      .slice(0, 80);
    return { questions: questionDescs.length, options: optionsULs.length, selected, buttonTexts, optionTexts };
  }).catch(err => ({ questions: 0, options: 0, selected: 0, error: err.message }));
}

async function inspectAnswerCompletion(page) {
  return getLearningFrame().evaluate(() => {
    const isSelected = el => {
      const cls = String(el.className || '');
      const attr = el.getAttribute('li-is-answer');
      const aria = el.getAttribute('aria-checked');
      return /(active|selected|checked|on|current|choosed)/i.test(cls) ||
        attr === 'true' || aria === 'true';
    };

    const allOpts = [...document.querySelectorAll('ul.options')];
    let answered = 0, unanswered = 0;
    for (const opt of allOpts) {
      const optionEls = [...opt.querySelectorAll('li')];
      if (!optionEls.length) { unanswered++; continue; }
      if (optionEls.some(isSelected)) answered++;
      else unanswered++;
    }
    return { questions: allOpts.length, answered, unanswered };
  }).catch(() => ({ questions: 0, answered: 0, unanswered: 0 }));
}

async function saveExamCapture(capture) {
  await fs.mkdir(EXAM_CAPTURE_DIR, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const file = path.join(EXAM_CAPTURE_DIR, `exam-${stamp}.json`);
  await fs.writeFile(file, JSON.stringify(capture, null, 2), 'utf8');
  log(`Exam capture saved: ${file}`);
}

function extractAnswerPlan(api) {
  const result = [];
  const seen = new WeakSet();
  const clean = value => String(value ?? '').replace(/\s+/g, ' ').trim();
  const stripHtml = value => String(value ?? '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  const splitIds = value => new Set(clean(value).split(/[,\s;|]+/).filter(Boolean));
  const firstText = (obj, keys) => {
    for (const key of keys) {
      const value = obj?.[key];
      if (typeof value === 'string' || typeof value === 'number') {
        const text = clean(value);
        if (text) return text;
      }
    }
    return '';
  };
  const firstId = obj => firstText(obj, ['id', 'answerId', 'optionId', 'paperOptionId', 'paperAnswerId', 'questionAnswerId', 'standardId', 'videoAnswerId']);
  const hasCorrectFlag = option => ['isRight', 'isCorrect', 'correct', 'right', 'isAnswer', 'startardAnswer', 'standardAnswer', 'checked']
    .some(key => option?.[key] === true || option?.[key] === 1 || option?.[key] === '1' || option?.[key] === 'true');
  const optionText = option => firstText(option, ['answerMemo', 'optionName', 'optionContent', 'answerContent', 'content', 'name', 'title', 'text', 'label', 'context']);
  const questionText = obj => firstText(obj, ['questionName', 'questionTitle', 'title', 'subjectName', 'stem', 'name', 'content', 'text']);

  const visit = obj => {
    if (!obj || typeof obj !== 'object') return;
    if (seen.has(obj)) return;
    seen.add(obj);

    for (const [key, value] of Object.entries(obj)) {
      if (!Array.isArray(value) || !value.length || !value.every(item => item && typeof item === 'object')) continue;
      if (!/(answer|option|choice|select|item|list|set)/i.test(key)) continue;

      const options = value.map(option => ({
        id: firstId(option),
        text: optionText(option),
        correct: hasCorrectFlag(option)
      })).filter(option => option.id || option.text);
      if (!options.length) continue;

      const standardIds = splitIds(firstText(obj, ['standardId', 'standardIds', 'answerId', 'answerIds', 'rightAnswerId', 'rightAnswerIds', 'correctAnswerId', 'correctAnswerIds']));
      const answerText = firstText(obj, ['answer', 'rightAnswer', 'correctAnswer', 'standardAnswerText']);
      const correct = options.filter(option => {
        if (option.correct) return true;
        if (option.id && standardIds.has(option.id)) return true;
        if (answerText && option.text && answerText.includes(option.text)) return true;
        return false;
      });

      if (correct.length) {
        result.push({
          text: stripHtml(questionText(obj)),
          correct: correct.map(option => ({ id: option.id, text: option.text }))
        });
      }
    }

    for (const value of Object.values(obj)) {
      if (value && typeof value === 'object') visit(value);
    }
  };

  visit(api);

  const unique = [];
  const keys = new Set();
  for (const item of result) {
    const key = `${item.text}|${item.correct.map(option => option.id || option.text).join(',')}`;
    if (keys.has(key)) continue;
    keys.add(key);
    unique.push(item);
  }
  return unique;
}

function buildFallbackAnswerPlan(api) {
  if (!api || typeof api !== 'object') return [];
  const clean = value => String(value ?? '').replace(/\s+/g, ' ').trim();
  const stems = api?.attribute?.data?.questionStemRPS;
  if (!stems || !Array.isArray(stems)) return [];
  const result = [];
  for (const stem of stems) {
    // Prioritize listPaperQuestionRP (has standardAnswer values)
    const questions = stem?.listPaperQuestionRP || stem?.paperQuestionRPS;
    if (!Array.isArray(questions)) continue;
    for (const q of questions) {
      const text = clean(q.questionName || '');
      const qType = q.type;
      const options = (q.paperOptionRPS || []).map(o => ({
        id: o.paperOptionId || '',
        text: clean(o.context || o.optionName || ''),
        optionNo: o.optionNo,
        standardAnswer: o.standardAnswer
      }));
      let correct = [];
      const hasAnswers = options.some(o => o.standardAnswer != null && o.standardAnswer !== '');
      if (hasAnswers) {
        correct = options.filter(o => o.standardAnswer === 1 || o.standardAnswer === true || String(o.standardAnswer) === '1');
      } else {
        if (qType === 1) {
          correct = options.filter(o => o.text === '对' || o.optionNo === 1);
        } else if (qType === 3) {
          correct = options;
        } else {
          correct = options.slice(0, 1);
        }
      }
      if (correct.length) {
        result.push({ text, correct: correct.map(o => ({ id: o.id, text: o.text })) });
      }
    }
  }
  return result;
}

function rememberExamResponse(entry) {
  if (!entry?.body) return;

  let json;
  try {
    json = JSON.parse(entry.body);
  } catch {
    return;
  }

  const answerPlan = extractAnswerPlan(json);
  const paperId = findFirstDeepValue(json, /paperId/i);
  const myExamRecordId = findFirstDeepValue(json, /myExamRecordId/i);
  const score = answerPlan.length * 100 + (paperId ? 10 : 0) + (myExamRecordId ? 5 : 0);
  if (!score) return;

  examResponseCache.unshift({
    at: new Date().toISOString(),
    url: entry.url,
    status: entry.status,
    contentType: entry.contentType,
    json,
    answerPlanSize: answerPlan.length,
    paperId: cleanScalar(paperId),
    myExamRecordId: cleanScalar(myExamRecordId)
  });
  if (examResponseCache.length > 20) examResponseCache.length = 20;
}

function findCachedExamPayload({ paperId, myExamRecordId, pageUrl }) {
  const normalizedRecordId = cleanScalar(myExamRecordId);
  const normalizedPaperId = cleanScalar(paperId);
  const ranked = examResponseCache
    .map(item => ({
      ...item,
      rank: scoreCachedExamPayload(item, {
        paperId: normalizedPaperId,
        myExamRecordId: normalizedRecordId,
        pageUrl
      })
    }))
    .filter(item => item.rank > 0)
    .sort((a, b) => b.rank - a.rank);

  if (!ranked.length) return null;
  const best = ranked[0];
  return {
    url: best.url,
    json: best.json,
    paperId: best.paperId,
    myExamRecordId: best.myExamRecordId,
    note: `Recovered from cached XHR with rank ${best.rank}`
  };
}

function scoreCachedExamPayload(item, ctx) {
  let score = item.answerPlanSize || 0;
  if (ctx.paperId && item.paperId && ctx.paperId === item.paperId) score += 2000;
  if (ctx.myExamRecordId && item.myExamRecordId && ctx.myExamRecordId === item.myExamRecordId) score += 2000;
  if (ctx.myExamRecordId && item.url?.includes(ctx.myExamRecordId)) score += 800;
  if (ctx.paperId && item.url?.includes(ctx.paperId)) score += 800;
  if (/start-do-paper-or-test|paper|question|answer/i.test(item.url || '')) score += 100;
  return score;
}

async function readExamRuntimePayload(page) {
  const result = await getLearningFrame().evaluate(() => {
    const clean = value => typeof value === 'string' ? value.trim() : value;
    const seen = new WeakSet();
    const candidates = [];
    const isObject = value => value && typeof value === 'object';
    const looksInteresting = key => /paper|exam|question|answer|record/i.test(String(key || ''));

    const visit = (value, path) => {
      if (!isObject(value) || seen.has(value)) return;
      seen.add(value);

      let text = '';
      try {
        text = JSON.stringify(value).slice(0, 4000);
      } catch {
        text = '';
      }
      if (/(isRight|isCorrect|standardAnswer|correctAnswer|questionName|optionName)/.test(text)) {
        candidates.push({
          path,
          value,
          paperId: clean(value.paperId),
          myExamRecordId: clean(value.myExamRecordId)
        });
      }

      for (const [key, child] of Object.entries(value)) {
        if (!isObject(child)) continue;
        if (looksInteresting(key) || path === 'window') {
          visit(child, `${path}.${key}`);
        }
      }
    };

    for (const key of Object.keys(window)) {
      try {
        if (!looksInteresting(key)) continue;
        visit(window[key], `window.${key}`);
      } catch {}
    }

    return candidates.slice(0, 10).map(item => ({
      path: item.path,
      paperId: item.paperId || null,
      myExamRecordId: item.myExamRecordId || null,
      value: item.value
    }));
  }).catch(() => []);

  for (const item of result) {
    const answerPlan = extractAnswerPlan(item.value);
    if (!answerPlan.length) continue;
    return {
      url: item.path,
      json: item.value,
      paperId: item.paperId,
      myExamRecordId: item.myExamRecordId,
      note: `Recovered from runtime object ${item.path}`
    };
  }
  return null;
}

function findFirstDeepValue(root, keyPattern) {
  const seen = new WeakSet();
  const visit = value => {
    if (!value || typeof value !== 'object') return undefined;
    if (seen.has(value)) return undefined;
    seen.add(value);

    for (const [key, child] of Object.entries(value)) {
      if (keyPattern.test(key) && child != null && child !== '') return child;
      if (child && typeof child === 'object') {
        const nested = visit(child);
        if (nested != null && nested !== '') return nested;
      }
    }
    return undefined;
  };
  return visit(root);
}

function cleanScalar(value) {
  if (value == null) return '';
  return String(value).trim();
}

async function answerCurrentExam(page, answerPlan) {
  const clean = value => String(value || '').replace(/\s+/g, ' ').trim();
  // Normalize for comparison: strip letter/number prefixes like "A.", "A、", "A)", "1.", etc.
  const normalize = value => clean(value).replace(/^[A-Za-z0-9]+[\.、．)\s]+/, '').trim();

  // Step 1: scan DOM and match via page.evaluate (fast)
  const groups = await getLearningFrame().evaluate(plan => {
    const clean = value => String(value || '').replace(/\s+/g, ' ').trim();
    const normalize = value => clean(value).replace(/^[A-Za-z0-9]+[\.、．)\s]+/, '').trim();

    const allOpts = [...document.querySelectorAll('ul.options')];
    const result = [];
    for (const opt of allOpts) {
      const lis = [...opt.querySelectorAll('li')];
      if (!lis.length) continue;
      const options = lis.map(li => ({
        rawText: clean(li.textContent),
        text: normalize(li.textContent),
        value: li.getAttribute('li-value') || ''
      }));
      result.push({ options });
    }

    return result.map((group, idx) => {
      const planItem = plan[idx];
      if (!planItem) return { ...group, matchTexts: [], fallback: false };

      const planTexts = (planItem.correct || []).flatMap(item => [normalize(item.id), normalize(item.text)]).filter(Boolean);
      const wanted = new Set(planTexts.filter(Boolean));

      const matched = group.options.filter(opt =>
        wanted.has(opt.text) || wanted.has(opt.rawText) ||
        planTexts.some(w => w && (opt.text.includes(w) || opt.rawText.includes(w) || w.includes(opt.text)))
      );

      if (matched.length) {
        return { ...group, matchTexts: matched.map(m => m.rawText.slice(0, 40)), fallback: false };
      }
      return { ...group, matchTexts: [], fallback: true };
    });
  }, answerPlan);

  log(`Found ${groups.length} option groups`);
  let answered = 0, fallback = 0, clicked = 0;

  // Step 2: use Playwright locators to scroll and click
  for (let idx = 0; idx < groups.length; idx++) {
    const group = groups[idx];
    if (!group.options.length) continue;

    const planItem = answerPlan[idx];
    const planTexts = planItem ? (planItem.correct || []).flatMap(item => [normalize(item.id), normalize(item.text)]).filter(Boolean) : [];
    const wantedSet = new Set(planTexts.filter(Boolean));
    const isMulti = (planItem?.correct?.length || 0) > 1;
    const typeTag = isMulti ? '[多选]' : (planItem ? '[单选/判断]' : '[无答案]');

    log(`  Q${idx+1} ${typeTag} plan=${planTexts.map(t=>t.slice(0,25)).join('|')} matched=${(group.matchTexts||[]).join(', ')} fallback=${group.fallback}`);

    const ulLocator = getLearningFrame().locator('ul.options').nth(idx);
    await ulLocator.scrollIntoViewIfNeeded().catch(() => {});
    await sleep(200);

    const liLocators = await ulLocator.locator('li').all();
    if (!liLocators.length) continue;

    let anyClicked = false;
    let anyMatched = false;
    let groupClicked = 0;

    for (const li of liLocators) {
      const rawText = clean(await li.textContent().catch(() => ''));
      const text = normalize(rawText);
      const isMatch = text && (wantedSet.has(text) || wantedSet.has(rawText) ||
        planTexts.some(w => w && (
          (text.includes(w) && w.length >= text.length * 0.85) ||
          (rawText.includes(w) && w.length >= rawText.length * 0.85) ||
          (w.includes(text) && text.length >= w.length * 0.85)
        )));

      if (isMatch) {
        anyMatched = true;

        if (isMulti) {
          // For multi-choice, first try to find and check hidden checkbox/radio inputs
          const hasInput = await li.evaluate(el => {
            const input = el.querySelector('input[type="checkbox"], input[type="radio"]');
            if (input) {
              input.checked = true;
              input.dispatchEvent(new Event('change', { bubbles: true }));
              input.dispatchEvent(new Event('input', { bubbles: true }));
              return true;
            }
            return false;
          });
          if (hasInput) {
            log(`    -> checked input in LI`);
          }
          // Try Playwright's native click (real mouse simulation)
          await li.click({ timeout: 3000 }).catch(async () => {
            // Fallback: try clicking parent du-click element
            await li.evaluate(el => {
              let parent = el.parentElement;
              while (parent) {
                const hasDuClick = parent.getAttribute('du-click');
                if (hasDuClick) {
                  parent.click();
                  const r = parent.getBoundingClientRect();
                  parent.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window, clientX: r.left + r.width/2, clientY: r.top + r.height/2 }));
                  return;
                }
                parent = parent.parentElement;
              }
              // Ultimate fallback: just click the LI
              el.click();
              const r = el.getBoundingClientRect();
              el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window, clientX: r.left + r.width/2, clientY: r.top + r.height/2 }));
            });
          });
          // Try direct scope manipulation
          await li.evaluate(el => {
            // Try to get Angular/DUI scope and toggle selection
            try {
              const scope = window.angular?.element(el)?.scope?.();
              if (scope?.$scope?.toggleSelect) {
                scope.$scope.toggleSelect(scope.$scope.item);
              }
            } catch {}
          });
        } else {
          // Single-choice: use evaluate-based DUI-compatible event sequence
          await li.evaluate(el => {
            el.click();
            const r = el.getBoundingClientRect();
            for (const type of ['mouseover', 'mousedown', 'mouseup', 'click']) {
              el.dispatchEvent(new MouseEvent(type, {
                bubbles: true, cancelable: true, view: window,
                clientX: r.left + r.width / 2, clientY: r.top + r.height / 2
              }));
            }
          });
        }

        clicked++;
        groupClicked++;
        log(`    -> clicked LI: "${rawText.slice(0, 50)}"`);
        if (isMulti) await sleep(500);
      }
    }

    // For single-choice: if no match found, click first as fallback
    if (!anyMatched && !anyClicked && group.options.length && !isMulti) {
      const li = liLocators[0];
      await li.evaluate(el => {
        el.click();
        const r = el.getBoundingClientRect();
        for (const type of ['mouseover', 'mousedown', 'mouseup', 'click']) {
          el.dispatchEvent(new MouseEvent(type, {
            bubbles: true, cancelable: true, view: window,
            clientX: r.left + r.width / 2, clientY: r.top + r.height / 2
          }));
        }
      });
      clicked++;
      groupClicked++;
      fallback++;
      log(`    -> fallback click: "${group.options[0]?.rawText?.slice(0, 50)}"`);
    }

    if (anyMatched) answered++;
    else if (groupClicked) fallback++;

    // Immediate post-click verification: check if any LI state changed
    if (groupClicked > 0 && isMulti) {
      const verify = await ulLocator.locator('li').evaluateAll(lis =>
        lis.map(li => ({
          cls: li.className,
          liAnswer: li.getAttribute('li-is-answer') || '',
          aria: li.getAttribute('aria-checked') || ''
        }))
      ).catch(() => []);
      const anyChanged = verify.some(v => /active|selected|checked|choosed/i.test(v.cls) || v.liAnswer === 'true' || v.aria === 'true');
      log(`    [VERIFY] Q${idx+1} post-click: anySelected=${anyChanged} classes=${verify.map(v=>v.cls).join('|')} liAnswer=${verify.map(v=>v.liAnswer).join('|')}`);
    }
  }

  log(`Answer result: groups=${groups.length}, matched=${answered}, fallback=${fallback}, totalClicks=${clicked}`);
  await sleep(500);
  return { questions: groups.length, answered, fallback, clicked };
}

async function clickNextStemTab(page) {
  return getLearningFrame().evaluate(() => {
    const visible = el => {
      if (!el) return false;
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return r.width > 0 && r.height > 0 && cs.display !== 'none' && cs.visibility !== 'hidden';
    };
    const isActive = el => {
      const cls = String(el.className || '') + ' ' + String(el.parentElement?.className || '');
      return /(active|current|selected|checked|on)[-_\s]|layui-this/i.test(cls);
    };

    // Only exact stem names - avoid matching "已做"/"未做" filter tabs
    const stemNames = ['判断题', '单选题', '多选题'];
    const blockedTexts = ['已做', '未做', '全部', '已完成', '未完成', '收藏', '错题'];

    const stemEl = text => {
      const t = text.trim();
      if (blockedTexts.some(b => t.includes(b))) return false;
      return stemNames.some(s => t === s || t.startsWith(s + '(') || t.startsWith(s + '（'));
    };

    // Look inside the exam question area first
    const paperArea = document.querySelector('.paper-content, .exam-content, .test-paper-area, .exam-question-area, #paper, #examContent, .play-exam-container');
    const searchRoot = paperArea || document;

    // Strategy: search for tab containers inside the paper area
    const tabContainers = [
      ...searchRoot.querySelectorAll('.dui-tab, [class*="tab-title"], [class*="tab-header"], [du-repeat*="questionStem"], [ng-repeat*="questionStem"], .layui-tab-title, .paper-stem-list')
    ];
    let allCandidates = [];

    for (const container of tabContainers) {
      const items = [...container.querySelectorAll('li, a, span, div, button, label')]
        .filter(el => visible(el) && stemEl(el.innerText || el.textContent || ''));
      allCandidates.push(...items);
    }

    // If no structured tab container found, search individual elements in the paper area
    if (!allCandidates.length) {
      const elements = [...searchRoot.querySelectorAll('li, a, span, div, button')]
        .filter(el => visible(el) && stemEl(el.innerText || el.textContent || ''));
      // Filter by position: stem tabs should be in the top portion of the paper area
      const paperRect = paperArea?.getBoundingClientRect();
      const paperTop = paperRect?.top || 80;
      allCandidates = elements.filter(el => {
        const r = el.getBoundingClientRect();
        return r.top >= paperTop && r.top < paperTop + 120;
      });
    }

    // Deduplicate by text content
    const seen = new Set();
    allCandidates = allCandidates.filter(el => {
      const t = (el.innerText || el.textContent || '').trim();
      if (seen.has(t)) return false;
      seen.add(t);
      return true;
    }).sort((a, b) => {
      const r = a.getBoundingClientRect().left - b.getBoundingClientRect().left;
      return r || a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
    });

    // Click first non-active stem tab
    for (const tab of allCandidates) {
      if (isActive(tab)) continue;
      const text = (tab.innerText || tab.textContent || '').trim();
      if (!stemEl(text)) continue;
      const r = tab.getBoundingClientRect();
      for (const type of ['mouseover', 'mousedown', 'mouseup', 'click']) {
        tab.dispatchEvent(new MouseEvent(type, { bubbles: true, cancelable: true, view: window, clientX: r.left + r.width / 2, clientY: r.top + r.height / 2 }));
      }
      tab.click?.();
      return `stem: ${stemNames.find(s => text.includes(s))}`;
    }

    return false;
  }).catch(() => false);
}

async function answerExamMultiPass(page, answerPlan) {
  let totalMatched = 0;
  let totalFallback = 0;
  let totalClicked = 0;

  for (let pass = 0; pass < 5; pass++) {
    const summary = await answerCurrentExam(page, answerPlan);
    totalMatched = summary.answered;
    totalFallback = summary.fallback;
    totalClicked += summary.clicked;

    const completion = await inspectAnswerCompletionByPlan(page, answerPlan);
    log(`Pass ${pass + 1}: matched=${summary.answered} fallback=${summary.fallback} options=${summary.questions} answered=${completion.answered} unanswered=${completion.unanswered} plan=${answerPlan.length}`);

    if (completion.answered >= answerPlan.length) break;
    if (!summary.questions && !summary.answered && !summary.fallback) break;
    await sleep(800);
  }

  return { totalApiMatched: totalMatched, totalFallback, totalClicked, answered: totalMatched };
}

async function inspectAnswerCompletionByPlan(page, answerPlan) {
  const count = await getLearningFrame().locator('ul.options').count().catch(() => 0);
  let answered = 0;
  let unanswered = 0;
  const details = [];

  for (let idx = 0; idx < count; idx++) {
    const ul = getLearningFrame().locator('ul.options').nth(idx);
    const liCount = await ul.locator('li').count().catch(() => 0);
    if (!liCount) { unanswered++; details.push(`Q${idx+1}:0li`); continue; }

    let anySelected = false;
    let selText = '';
    for (let liIdx = 0; liIdx < liCount; liIdx++) {
      const li = ul.locator('li').nth(liIdx);
      const liClass = await li.getAttribute('class').catch(() => '');
      const ariaChecked = await li.getAttribute('aria-checked').catch(() => '');
      const liAnswer = await li.getAttribute('li-is-answer').catch(() => '');
      if (/(active|selected|checked|choosed)/i.test(liClass) || ariaChecked === 'true' || liAnswer === 'true') {
        anySelected = true;
        const txt = (await li.textContent().catch(() => '') || '').trim().slice(0, 30);
        selText = txt;
        break;
      }
    }
    if (anySelected) {
      answered++;
      details.push(`Q${idx+1}:OK(${selText})`);
    } else {
      unanswered++;
      // Get first option text for context
      const firstTxt = (await ul.locator('li').first().textContent().catch(() => '') || '').trim().slice(0, 20);
      details.push(`Q${idx+1}:NO(${firstTxt}...)`);
    }
  }

  log(`Completion detail: ${details.join(' ')}`);
  return { questions: count, answered, unanswered, planSize: answerPlan.length };
}

async function submitCurrentExam(page) {
  const submit = getLearningFrame().locator('#commit-answer, .btn-submit, span[du-click="onsubmit"], button:has-text("提交答案"), span:has-text("提交答案")').first();
  if (!(await submit.count().catch(() => 0))) {
    log('Submit button not found');
    return;
  }

  log('Submitting answers');
  // DUI-compatible click with full event sequence
  await submit.evaluate(el => {
    el.click();
    const r = el.getBoundingClientRect();
    for (const type of ['mouseover', 'mousedown', 'mouseup', 'click']) {
      el.dispatchEvent(new MouseEvent(type, {
        bubbles: true, cancelable: true, view: window,
        clientX: r.left + r.width / 2, clientY: r.top + r.height / 2
      }));
    }
  });
  await sleep(1500);

  // Try various confirm dialog selectors
  const confirm = getLearningFrame().locator('.modal button:has-text("确定"), .modal button:has-text("确认"), button:has-text("确定"), button:has-text("确认"), .layui-layer-btn0, [class*="layer"]:has-text("确定"), .dialog-confirm:has-text("确定")').first();
  if (await confirm.count().catch(() => 0)) {
    log('Confirm dialog found, clicking confirm');
    await confirm.evaluate(el => {
      el.click();
      const r = el.getBoundingClientRect();
      for (const type of ['mouseover', 'mousedown', 'mouseup', 'click']) {
        el.dispatchEvent(new MouseEvent(type, {
          bubbles: true, cancelable: true, view: window,
          clientX: r.left + r.width / 2, clientY: r.top + r.height / 2
        }));
      }
    }).catch(() => {});
  } else {
    log('No confirm dialog detected');
  }

  await getLearningFrame().waitForLoadState('domcontentloaded').catch(() => {});
  await sleep(2500);
}

async function findFirstIncompleteCourse(page) {
  for (let retry = 0; retry < 10; retry++) {
    const cards = await getLearningFrame().locator('.col-xs-12.col-sm-12.col-md-6.col-lg-4').all();
    for (const card of cards) {
      const title = await textOf(card.locator('.item-tt-link').first());
      const progressText = await textOf(card.locator('.sr-only').first());
      const barStyle = await card.locator('.progress-bar').first().getAttribute('style').catch(() => '');
      const progress = parseProgress(progressText || barStyle || '');
      if (title && progress < 100) {
        const locator = card.locator('a[du-click="courseck"]').first();
        return { title, progress, locator };
      }
    }
    await sleep(1500);
  }
  return null;
}

async function waitForCoursePage(page) {
  for (let retry = 0; retry < 15; retry++) {
    if (await getLearningFrame().locator('li.videoLi').count().catch(() => 0)) return;
    await sleep(1000);
  }
}

async function playCourseVideos(page) {
  while (true) {
    const videos = await getVideoItems(page);
    const pending = videos.filter(v => v.progress < 100 && !v.finished);
    if (!pending.length) {
      log('当前课程视频已完成');
      return;
    }

    const item = pending[0];
    log(`播放视频: ${item.index + 1}/${videos.length}, 当前进度 ${item.progress}%`);
    await item.locator.click({ force: true });
    await sleep(1000);
    await muteAllFrames(page);
    await sleep(500);
    await waitVideoDone(page, item.index);
  }
}

async function getVideoItems(page) {
  const rows = await getLearningFrame().locator('li.videoLi').all();
  const result = [];
  for (let index = 0; index < rows.length; index++) {
    const row = rows[index];
    const badge = await textOf(row.locator('.badge').first());
    const progress = parseFloat(badge) || 0;
    const finished = await row.locator('.progress-bar.finish').count().catch(() => 0);
    result.push({ index, progress, finished: finished > 0, locator: row });
  }
  return result;
}

async function waitVideoDone(page, videoIndex) {
  let lastTime = -1;
  let stall = 0;
  const startedAt = Date.now();

  while (Date.now() - startedAt < 6 * 60 * 60 * 1000) {
    if (checkStop()) { log('停止: 用户中断视频播放', 'warn'); return; }
    await muteAllFrames(page);
    await keepAllFramesPlaying(page);
    await handleQuestionPopups(page);

    const rows = await getVideoItems(page);
    const current = rows[videoIndex];
    if (current && (current.progress >= 100 || current.finished)) {
      log(`视频完成: ${videoIndex + 1}`);
      return;
    }

    const state = await readBestVideoState(page);
    if (state?.ended) return;
    if (state && state.currentTime > 0) {
      if (Math.abs(state.currentTime - lastTime) < 0.2) {
        stall++;
      } else {
        stall = 0;
        lastTime = state.currentTime;
      }
      if (stall >= 5) {
        log('检测到播放卡住，尝试恢复');
        await clickPlayFallbacks(page);
        stall = 0;
      }
    }

    await sleep(3000);
  }

  throw new Error(`等待视频 ${videoIndex + 1} 完成超时`);
}

async function keepAllFramesPlaying(page) {
  for (const frame of page.frames()) {
    await frame.evaluate(() => {
      const visible = el => {
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return r.width > 0 && r.height > 0 && cs.display !== 'none' && cs.visibility !== 'hidden';
      };

      document.querySelectorAll('video, audio').forEach(media => {
        media.muted = true;
        media.defaultMuted = true;
        media.volume = 0;
      });

      const play = document.querySelector('#play, .pv-playpause.pv-icon-btn-play, .bplayer-playpause.bplayer-btn-play');
      if (play && visible(play)) {
        const r = play.getBoundingClientRect();
        for (const type of ['mouseover', 'mousedown', 'mouseup', 'click']) {
          play.dispatchEvent(new MouseEvent(type, {
            bubbles: true,
            cancelable: true,
            view: window,
            clientX: r.left + r.width / 2,
            clientY: r.top + r.height / 2
          }));
        }
      }

      document.querySelectorAll('video, audio').forEach(media => {
        media.muted = true;
        media.defaultMuted = true;
        media.volume = 0;
        if (media.paused && !media.ended) media.play().catch(() => {});
      });
    }).catch(() => {});
  }
}

async function muteAllFrames(page) {
  for (const frame of page.frames()) {
    await frame.evaluate(() => {
      const visible = el => {
        if (!el) return false;
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return r.width > 0 && r.height > 0 && cs.display !== 'none' && cs.visibility !== 'hidden';
      };

      document.querySelectorAll('video, audio').forEach(media => {
        media.muted = true;
        media.defaultMuted = true;
        media.volume = 0;
        media.setAttribute('muted', '');
      });

      const mutedSelectors = [
        '#speaker.pv-icon-btn-volmute',
        '#speaker.bplayer-vol-muted',
        '.pv-volume.pv-icon-btn-volmute',
        '.bplayer-volume.bplayer-vol-muted',
        '.vjs-mute-control.vjs-vol-0',
        '.vjs-mute-control.vjs-muted'
      ];
      if (mutedSelectors.some(selector => document.querySelector(selector))) return;

      const candidates = [
        '#speaker',
        '.pv-volume:not(.pv-icon-btn-volmute)',
        '.bplayer-volume.bplayer-vol-open',
        '.vjs-mute-control:not(.vjs-vol-0):not(.vjs-muted)',
        '[aria-label*="静音"]',
        '[title*="静音"]',
        '[class*="volume"]',
        '[class*="speaker"]',
        '[class*="sound"]'
      ];

      const button = candidates
        .flatMap(selector => [...document.querySelectorAll(selector)])
        .find(el => visible(el) && !/muted|volmute|vol-0/i.test(String(el.className || '')));

      if (button) {
        const r = button.getBoundingClientRect();
        for (const type of ['mouseover', 'mousedown', 'mouseup', 'click']) {
          button.dispatchEvent(new MouseEvent(type, {
            bubbles: true,
            cancelable: true,
            view: window,
            clientX: r.left + r.width / 2,
            clientY: r.top + r.height / 2
          }));
        }
      }

      document.querySelectorAll('video, audio').forEach(media => {
        media.muted = true;
        media.defaultMuted = true;
        media.volume = 0;
      });
    }).catch(() => {});
  }
}

async function handleQuestionPopups(page) {
  for (const frame of page.frames()) {
    await frame.evaluate(() => {
      const visible = el => {
        if (!el) return false;
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return r.width > 0 && r.height > 0 && cs.display !== 'none' && cs.visibility !== 'hidden' && cs.opacity !== '0';
      };

      const popup = [...document.querySelectorAll('.bplayer-question-wrap, .question-modal-container, .pv-ask-modal-wrap')]
        .find(visible);
      if (!popup) return;

      const clickNatural = el => {
        const r = el.getBoundingClientRect();
        for (const type of ['mouseover', 'mousedown', 'mouseup', 'click']) {
          el.dispatchEvent(new MouseEvent(type, {
            bubbles: true,
            cancelable: true,
            view: window,
            clientX: r.left + r.width / 2,
            clientY: r.top + r.height / 2
          }));
        }
      };

      const options = [...popup.querySelectorAll('.options .option-item, .option-item, .answer-item, label, li')]
        .filter(visible)
        .filter(el => el.textContent.trim())
        .filter((el, index, arr) => arr.findIndex(item => item.textContent.trim() === el.textContent.trim()) === index);

      const buttons = [...popup.querySelectorAll('button, .bplayer-btn, .confirm-button, .pv-ask-submit, [role="button"]')]
        .filter(visible)
        .filter(el => el.textContent.trim() || el.className);

      const retry = buttons.find(el => /重试|再试|重新|继续答题|继续作答/.test(el.textContent.trim()));
      if (retry) {
        clickNatural(retry);
        return;
      }

      if (!options.length) {
        const done = buttons.find(el => /完成|继续|确定|关闭/.test(el.textContent.trim())) ||
          popup.querySelector('.complete.bplayer-btn, .confirm-button, .pv-ask-submit, button.btn-confirm');
        if (done && visible(done)) clickNatural(done);
        return;
      }

      const optionText = options.map(el => el.textContent.trim().replace(/\s+/g, ' '));
      const titleNode = popup.querySelector('.question-title, .question-stem, .title, .stem, .bplayer-question-title, .pv-ask-title');
      const titleText = (titleNode?.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 200);
      const key = `${titleText}|${optionText.join('|')}`;
      const state = window.__learningQuestionState || {};
      if (state.key !== key) {
        window.__learningQuestionState = {
          key,
          tried: [],
          lastAt: 0
        };
      }

      const currentState = window.__learningQuestionState;
      if (Date.now() - currentState.lastAt < 1200) return;

      const selected = el => {
        const input = el.matches('input') ? el : el.querySelector('input');
        if (input && ['checkbox', 'radio'].includes(input.type)) return input.checked;
        const className = String(el.className || '');
        return el.getAttribute('aria-checked') === 'true' ||
          /(^|\s)(active|selected|checked|current|choosed|on)(\s|$)/i.test(className);
      };

      const hasCheckbox = options.some(el => el.querySelector('input[type="checkbox"]') || el.matches('input[type="checkbox"]'));
      const hasRadio = options.some(el => el.querySelector('input[type="radio"]') || el.matches('input[type="radio"]'));
      const isMulti = hasCheckbox || (!hasRadio && /多选|多项|不定项/.test(popup.textContent));
      const optionCount = Math.min(options.length, 8);

      const makeCombos = () => {
        if (!isMulti) return Array.from({ length: optionCount }, (_, index) => [index]);

        const combos = [Array.from({ length: optionCount }, (_, index) => index)];
        for (let mask = (1 << optionCount) - 2; mask >= 1; mask--) {
          const combo = [];
          for (let index = 0; index < optionCount; index++) {
            if (mask & (1 << index)) combo.push(index);
          }
          combos.push(combo);
        }
        return combos.sort((a, b) => b.length - a.length);
      };

      const comboKey = combo => combo.join(',');
      const combo = makeCombos().find(item => !currentState.tried.includes(comboKey(item)));
      if (!combo) return;

      const desired = new Set(combo);
      for (let index = 0; index < optionCount; index++) {
        const shouldSelect = desired.has(index);
        if (selected(options[index]) !== shouldSelect) clickNatural(options[index]);
      }

      const commit = buttons.find(el => /提交|确定|确认|完成|commit|submit/i.test(el.textContent.trim() || String(el.className || ''))) ||
        popup.querySelector('.commit.bplayer-btn, button[type="submit"], .pv-ask-submit, .confirm-button, button.btn-confirm');
      if (commit && visible(commit)) {
        currentState.tried.push(comboKey(combo));
        currentState.lastAt = Date.now();
        clickNatural(commit);
      }
    }).catch(() => {});
  }
}

async function readBestVideoState(page) {
  const states = [];
  for (const frame of page.frames()) {
    const state = await frame.evaluate(() => {
      const videos = [...document.querySelectorAll('video')]
        .filter(v => Number.isFinite(v.duration) ? v.duration >= 30 : true)
        .sort((a, b) => (b.duration || 0) - (a.duration || 0));
      const v = videos[0];
      if (!v) return null;
      return {
        currentTime: v.currentTime || 0,
        duration: v.duration || 0,
        paused: v.paused,
        ended: v.ended,
        src: v.currentSrc || v.src || ''
      };
    }).catch(() => null);
    if (state) states.push(state);
  }
  return states.sort((a, b) => (b.duration || 0) - (a.duration || 0))[0] || null;
}

async function clickPlayFallbacks(page) {
  await muteAllFrames(page);
  await keepAllFramesPlaying(page);
  await page.keyboard.press('Space').catch(() => {});
  await muteAllFrames(page);
  await page.mouse.move(600, 420).catch(() => {});
  await page.mouse.click(600, 420).catch(() => {});
  await muteAllFrames(page);
}

async function textOf(locator) {
  const value = await locator.textContent({ timeout: 1000 }).catch(() => '');
  return String(value || '').trim();
}

function parseProgress(text) {
  const match = String(text || '').match(/([\d.]+)%/);
  return match ? parseFloat(match[1]) : 0;
}

main().catch(err => {
  console.error(err);
  process.exitCode = 1;
});
