// Content script for sddy.gxk.yxlearning.com automation
// User logs in manually — this handles video playback and exams only

const STEP = {
  IDLE: 0,
  PROCESS_COURSES: 1,
  INSIDE_COURSE: 2,
  GOTO_EXAM: 3,
  PROCESS_EXAMS: 4,
  DONE: 5
};

let isRunning = false;

// =====================================================
// State persistence
// =====================================================

async function saveStep(step) {
  return chrome.storage.local.set({ autoStep: step });
}

async function loadState() {
  return chrome.storage.local.get(['autoStep']);
}

async function clearState() {
  return chrome.storage.local.remove(['autoStep']);
}

// =====================================================
// Utils
// =====================================================

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function sendStatus(text, type = 'running') {
  chrome.runtime.sendMessage({ type: 'status', text, status: type });
}

function sendProgress(value, text) {
  chrome.runtime.sendMessage({ type: 'progress', value, text });
}

function waitForEl(selector, timeout = 15000) {
  return new Promise((resolve, reject) => {
    const found = document.querySelector(selector);
    if (found) return resolve(found);
    const obs = new MutationObserver((_, o) => {
      const el = document.querySelector(selector);
      if (el) { o.disconnect(); resolve(el); }
    });
    obs.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => { obs.disconnect(); reject(new Error(`超时: ${selector}`)); }, timeout);
  });
}

function click(el) {
  if (!el) return;
  el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  if (typeof el.onclick === 'function') el.onclick();
}

// =====================================================
// Course List Processing (on /my/learning page)
// =====================================================

async function getCourses() {
  const items = document.querySelectorAll('.col-xs-12.col-sm-12.col-md-6.col-lg-4');
  const courses = [];
  items.forEach(item => {
    const titleEl = item.querySelector('.item-tt-link');
    const bar = item.querySelector('.progress-bar');
    const sr = item.querySelector('.sr-only');
    if (!titleEl || !bar) return;
    const title = titleEl.getAttribute('title') || titleEl.textContent.trim();
    let pct = 0;
    if (sr) {
      const m = sr.textContent.match(/([\d.]+)%/);
      if (m) pct = parseFloat(m[1]);
      // If sr text doesn't contain a percentage (e.g. "不计进度"), pct stays 0
    } else {
      const s = bar.getAttribute('style') || '';
      const m = s.match(/width:\s*([\d.]+)%/);
      if (m) pct = parseFloat(m[1]);
    }
    const done = pct >= 100;
    courses.push({ title, progress: pct, done, element: item });
  });
  return courses;
}

// Click into the first incomplete course on the learning center page
async function clickFirstIncompleteCourse() {
  sendStatus('检查课程进度...', 'running');

  // Wait for course list to load (retry up to 15s)
  let courses;
  for (let retry = 0; retry < 10; retry++) {
    courses = await getCourses();
    if (courses.length > 0) break;
    await sleep(1500);
  }

  const total = courses.length;
  let done = courses.filter(c => c.done).length;
  sendProgress(20, `已完成 ${done}/${total} 门`);

  const left = courses.filter(c => !c.done);
  if (!left.length) {
    sendStatus('所有课程已完成', 'success');
    sendProgress(50, '课程完成');
    return null; // All done
  }

  const c = left[0];
  sendStatus(`进入课程: ${c.title}`, 'running');
  sendProgress(20, `${c.title} (${done + 1}/${total})`);

  // Click the course card — this navigates to the course video page
  const link = c.element.querySelector('a[du-click="courseck"]');
  if (!link) {
    sendStatus('未找到课程入口链接', 'error');
    return null;
  }
  click(link);
  return c.title;
}

// =====================================================
// Video Playback (inside a course page)
// =====================================================

async function muteVideo() {
  // Click the parent button containing the speaker SVG
  const speaker = document.querySelector('#speaker');
  if (speaker) {
    // Try clicking the parent button first, fallback to SVG itself
    const btn = speaker.closest('button') || speaker.closest('[role="button"]') || speaker.parentElement;
    click(btn || speaker);
    await sleep(300);
    sendStatus('已静音', 'running');
    return;
  }
  // Fallback: look for a mute button by common selectors
  const muteBtn = document.querySelector('.volume-icon, .mute-btn, .player-mute, [class*="volume"], [class*="mute"]');
  if (muteBtn) {
    click(muteBtn);
    await sleep(300);
  }
}

async function playVideos() {
  await sleep(2000);
  await muteVideo();
  let items = document.querySelectorAll('li.videoLi');
  if (!items.length) {
    try { await waitForEl('li.videoLi', 8000); items = document.querySelectorAll('li.videoLi'); }
    catch (e) { sendStatus('本课程无视频列表', 'warning'); return false; }
  }

  const pending = [];
  items.forEach(li => {
    const badge = li.querySelector('.badge');
    const pct = parseFloat(badge ? badge.textContent.trim() : '0') || 0;
    const finished = li.querySelector('.progress-bar.finish');
    if (!finished && pct < 100) pending.push(li);
  });

  if (!pending.length) {
    sendStatus('所有视频已完成', 'success');
    return true;
  }

  sendStatus(`待播放 ${pending.length} 个视频`, 'running');
  for (let i = 0; i < pending.length; i++) {
    const pct = parseFloat(pending[i].querySelector('.badge')?.textContent || '0') || 0;
    sendProgress(30 + (i / pending.length) * 30, `视频 ${i + 1}/${pending.length} (${pct}%)`);
    sendStatus(`播放视频 ${i + 1}/${pending.length}`, 'running');
    click(pending[i]);
    await sleep(2000);
    // Click play button in the video player
    const playBtn = document.querySelector('#play');
    if (playBtn) { click(playBtn); await sleep(500); }
    await waitVideoEnd();
  }
  return true;
}

async function waitVideoEnd() {
  let lastTime = 0, stall = 0, qAttempt = 0;
  while (true) {
    await sleep(3000);
    if (await handlePopupQuestion(qAttempt)) qAttempt++;

    const active = document.querySelector('li.videoLi.active');
    if (active) {
      if ((parseFloat(active.querySelector('.badge')?.textContent) || 0) >= 100) return;
      if (active.querySelector('.progress-bar.finish')) return;
    }

    const video = document.querySelector('video');
    if (video) {
      if (video.ended) return;
      if (video.paused) video.play().catch(() => {});
      if (video.currentTime === lastTime && video.currentTime > 0) {
        stall++;
        if (stall >= 4) { video.play().catch(() => {}); stall = 0; }
      } else { stall = 0; lastTime = video.currentTime; }
    }
  }
}

async function handlePopupQuestion(attempt) {
  const popup = document.querySelector('.bplayer-question-wrap');
  if (!popup || popup.style.display === 'none') return false;

  sendStatus('答题弹窗...', 'running');
  await sleep(2000);
  const opts = popup.querySelectorAll('.options .option-item');
  if (!opts.length) return false;

  // Detect question type from title text: 【判断题】/【单选题】/【多选题】
  const titleEl = popup.querySelector('.title');
  const titleText = titleEl ? titleEl.textContent : '';
  const isMulti = titleText.includes('多选题');

  if (isMulti) {
    // 多选题: try selecting all options; if wrong, exclude one at a time
    if (attempt === 0) {
      opts.forEach(o => click(o));
    } else {
      const excludeIdx = (attempt - 1) % opts.length;
      opts.forEach((o, i) => { if (i !== excludeIdx) click(o); });
    }
  } else {
    // 单选题/判断题: cycle through options one at a time
    const idx = attempt % opts.length;
    click(opts[idx]);
  }

  await sleep(500);
  const commit = popup.querySelector('.commit.bplayer-btn');
  if (commit) { click(commit); await sleep(1500); }

  if (popup.querySelector('.answer-image.correct')) {
    sendStatus('回答正确', 'success');
    const done = popup.querySelector('.complete.bplayer-btn');
    if (done) { click(done); await sleep(1000); }
    return true;
  }

  sendStatus('回答错误，等待重试...', 'running');
  const done = popup.querySelector('.complete.bplayer-btn');
  if (done) click(done);
  await sleep(15000);
  return true;
}

// Navigate back to learning center from course page
async function goBackToLearningCenter() {
  sendStatus('返回学习中心...', 'running');
  window.location.href = window.location.origin + '/my/learning';
}

// =====================================================
// Exam Processing
// =====================================================

async function clickPendingTab() {
  try {
    const tab = await waitForEl('span[du-click="pendingexambtn"]', 10000);
    if (tab) { click(tab); await sleep(1500); }
  } catch (e) {}
}

async function getExams() {
  await clickPendingTab();
  try { await waitForEl('#joined', 10000); } catch (e) { return []; }

  const exams = [];
  document.querySelectorAll('#joined tbody tr').forEach(row => {
    const title = row.querySelector('.title');
    const status = row.querySelector('td:nth-child(3) p');
    const btn = row.querySelector('button[btn-name="toExam"]');
    if (title && btn) exams.push({
      title: title.getAttribute('title') || title.textContent.trim(),
      status: status?.textContent.trim() || '',
      btn
    });
  });
  return exams;
}

async function takeExam(examBtn) {
  sendStatus('进入考试...', 'running');
  click(examBtn); await sleep(3000);
  try {
    const go = await waitForEl('.btn-primary[du-click="goExam"]', 10000);
    if (go) { click(go); await sleep(4000); }
  } catch (e) { sendStatus('未找到确认按钮', 'error'); return; }

  const m = window.location.href.match(/paperId=([^&]+)/);
  if (m) {
    chrome.runtime.sendMessage({ type: 'getCookies' }, resp => {
      if (resp?.cookies) {
        chrome.runtime.sendMessage({
          type: 'fetchExamQuestions',
          url: `${window.location.origin}/train/cms/paper/start-do-paper-or-test.gson?paperId=${m[1]}`,
          cookies: resp.cookies
        });
      }
    });
  }

  await answerExam();
}

async function answerExam() {
  sendStatus('作答中...', 'running');
  await sleep(2000);
  document.querySelectorAll('.option-item, .exam-option').forEach(el => click(el));
  await sleep(1000);
  const sub = document.querySelector('#commit-answer, .btn-submit, span[du-click="onsubmit"]');
  if (sub) {
    sendStatus('提交答案中...', 'running');
    click(sub);
    await sleep(3000);
    sendStatus('提交完成', 'success');
  } else {
    sendStatus('未找到提交按钮', 'warning');
  }
}

async function processExams() {
  sendStatus('检查考试列表...', 'running');
  sendProgress(70, '获取考试列表');
  const exams = await getExams();
  const pending = exams.filter(e => e.status === '待考试');
  sendProgress(75, `待考试 ${pending.length} 门`);

  for (let i = 0; i < pending.length; i++) {
    sendStatus(`考试 ${i + 1}/${pending.length}: ${pending[i].title}`, 'running');
    sendProgress(75 + (i / pending.length) * 20, `考试 ${i + 1}/${pending.length}`);
    await takeExam(pending[i].btn);
    window.location.href = window.location.origin + '/my/exam';
    await sleep(3000);
  }
  return true;
}

// =====================================================
// Navigation Helpers
// =====================================================

async function goToLearningCenter() {
  sendStatus('前往学习中心...', 'running');
  sendProgress(15, '前往学习中心');
  await sleep(1500);

  if (!window.location.href.includes('/my/learning')) {
    const dropdown = document.querySelector('a.dropdown-toggle.apply-tt');
    if (dropdown) {
      click(dropdown);
      await sleep(800);
    }

    const lcLink = document.querySelector('#header_learning');
    if (lcLink) {
      const href = lcLink.getAttribute('href');
      if (href) {
        window.location.href = href.startsWith('http') ? href : window.location.origin + href;
        return true;
      }
      click(lcLink);
    }

    window.location.href = window.location.origin + '/my/learning';
    return true;
  }
  return false;
}

// =====================================================
// Main State Machine
// =====================================================

async function run(step) {
  isRunning = true;

  try {
    // === INSIDE COURSE: play videos, then go back to learning center ===
    if (step === STEP.INSIDE_COURSE) {
      sendStatus('进入课程页面，开始播放视频...', 'running');
      sendProgress(25, '视频播放中');
      await playVideos();
      sendProgress(60, '视频播放完成');
      await saveStep(STEP.PROCESS_COURSES);
      await goBackToLearningCenter();
      return; // Page reloads
    }

    // === NAVIGATE TO LEARNING CENTER if needed ===
    if (!window.location.href.includes('/my/learning') && !window.location.href.includes('/my/exam')) {
      if (step <= STEP.PROCESS_COURSES) {
        await goToLearningCenter();
        return; // Navigation triggers page load
      }
    }

    // === PROCESS COURSES (on /my/learning page) ===
    if (step <= STEP.PROCESS_COURSES) {
      const courseTitle = await clickFirstIncompleteCourse();
      if (courseTitle) {
        // Page will navigate to course — save INSIDE_COURSE for the next load
        await saveStep(STEP.INSIDE_COURSE);
        return;
      }
      // All courses done, move to exams
      await saveStep(STEP.GOTO_EXAM);
    }

    // === PROCESS EXAMS ===
    if (step <= STEP.GOTO_EXAM || step === STEP.PROCESS_EXAMS) {
      if (!window.location.href.includes('/my/exam')) {
        await saveStep(STEP.PROCESS_EXAMS);
        window.location.href = window.location.origin + '/my/exam';
        return;
      }
      await processExams();
      await saveStep(STEP.DONE);
    }

    if (step >= STEP.DONE) {
      sendStatus('全部任务完成！', 'success');
      sendProgress(100, '全部完成');
    }
  } catch (err) {
    console.error(err);
    sendStatus('出错: ' + err.message, 'error');
  }

  isRunning = false;
  clearState();
}

// =====================================================
// Entry: check state on every page load
// =====================================================

(async function init() {
  if (isRunning) return;
  await sleep(1200);
  const state = await loadState();
  if (state.autoStep && state.autoStep > 0 && state.autoStep < STEP.DONE) {
    console.log(`[Auto] Continue step ${state.autoStep} on page ${window.location.href}`);
    isRunning = true;
    run(state.autoStep);
  }
})();

// =====================================================
// Message listener
// =====================================================

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'ping') {
    sendResponse({ ok: true });
    return;
  }

  if (msg.type === 'start') {
    if (isRunning) {
      sendResponse({ success: false, message: '已有进行中的任务' });
      return;
    }
    loadState().then(state => {
      if (state.autoStep && state.autoStep > 0 && state.autoStep < STEP.DONE) {
        sendResponse({ success: false, message: '已有进行中的任务' });
        return;
      }
      saveStep(STEP.PROCESS_COURSES);
      isRunning = true;
      run(STEP.PROCESS_COURSES);
      sendResponse({ success: true });
    });
    return true;
  }

  if (msg.type === 'getStatus') {
    loadState().then(s => sendResponse({ isRunning, step: s.autoStep || 0 }));
    return true;
  }

  if (msg.type === 'stop') {
    isRunning = false;
    clearState();
    sendResponse({ success: true });
  }
});

document.documentElement.setAttribute('data-auto-ext', 'loaded');
console.log('[Auto] Content script ready, page:', window.location.href);
