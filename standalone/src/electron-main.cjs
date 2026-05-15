// Electron main process — BrowserView + Playwright CDP automation
const { app, BrowserWindow, BrowserView, ipcMain, session, shell } = require('electron');
const path = require('node:path');

const DEFAULT_URL = 'http://sddy.gxk.yxlearning.com/login';
const UPDATE_URL = 'https://github.com/hexianyun/dongyingjixujiaoyu-automation/releases';
const CDP_PORT = 9223;
const BASE_URL = String(process.env.BASE_URL || 'http://sddy.gxk.yxlearning.com').trim();
const EXAMS_ONLY = ['1', 'true', 'yes'].includes(String(process.env.EXAMS_ONLY || '').toLowerCase());
const ALLOW_EXAM_SUBMIT = !process.env.ALLOW_EXAM_SUBMIT || ['1', 'true', 'yes'].includes(String(process.env.ALLOW_EXAM_SUBMIT).toLowerCase());
const AUTO_START = ['1', 'true', 'yes'].includes(String(process.env.AUTO_CONTINUE || '').toLowerCase());
const PROXY_SERVER = process.env.PROXY_SERVER || '';

app.commandLine.appendSwitch('remote-debugging-port', String(CDP_PORT));
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');
if (PROXY_SERVER) {
  app.commandLine.appendSwitch('proxy-server', PROXY_SERVER);
}

let win, view;
let running = false;
let startedAt = null;

// ── Window & BrowserView ───────────────────────────────────
function createWindow() {
  win = new BrowserWindow({
    width: 1450,
    height: 820,
    minWidth: 1100,
    minHeight: 680,
    show: false,
    frame: false,
    icon: path.join(__dirname, '..', 'dyzs.ico'),
    backgroundColor: '#eef6ff',
    webPreferences: {
      preload: path.join(__dirname, 'electron-preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  view = new BrowserView({
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  win.setBrowserView(view);
  win.loadFile(path.join(__dirname, 'electron-shell.html'));

  // Prevent popup windows — intercept window.open and navigate in-place
  view.webContents.setWindowOpenHandler(({ url }) => {
    console.log('Popup intercepted, navigating BrowserView:', url);
    view.webContents.loadURL(url);
    return { action: 'deny' };
  });

  view.webContents.on('did-navigate', (_event, url) => {
    win.webContents.send('browser-url', url);
  });
  view.webContents.on('did-navigate-in-page', (_event, url) => {
    win.webContents.send('browser-url', url);
  });
  view.webContents.on('page-title-updated', (_event, title) => {
    win.setTitle(title || '东营继续教育助手');
  });

  // Auto-start when AUTO_CONTINUE is set — wait for shell page to be ready
  if (AUTO_START) {
    let autoStarted = false;
    const doAutoStart = () => {
      if (running || autoStarted) return;
      autoStarted = true;
      setTimeout(() => {
        if (!running) {
          running = true;
          startedAt = Date.now();
          console.log('Auto-start: EXAMS_ONLY=' + EXAMS_ONLY);
          if (EXAMS_ONLY) startExamsOnly();
          else startAutomation();
        }
      }, 3000);
    };
    // Trigger on shell page ready (win, not view)
    win.webContents.on('did-finish-load', doAutoStart);
  }

  // Load the initial URL AFTER listeners are registered
  view.webContents.on('dom-ready', hideKnownPagePopups);
  view.webContents.on('did-finish-load', hideKnownPagePopups);
  view.webContents.loadURL(DEFAULT_URL);

  win.once('ready-to-show', () => {
    layoutBrowserView();
    win.show();
  });
  win.on('resize', layoutBrowserView);
  win.on('maximize', layoutBrowserView);
  win.on('unmaximize', layoutBrowserView);
}

function layoutBrowserView() {
  if (!win || !view) return;
  const [width, height] = win.getContentSize();
  const left = 26;
  const top = 140;
  const rightPanel = 438;
  const bottom = 58;
  view.setBounds({
    x: left,
    y: top,
    width: Math.max(480, width - left - rightPanel),
    height: Math.max(360, height - top - bottom)
  });
  view.setAutoResize({ width: true, height: true });
}

// ── Header bypass (remove X-Frame-Options etc) ─────────────
function hideKnownPagePopups() {
  if (!view || view.webContents.isDestroyed()) return;

  const script = `
    (() => {
      if (window.__yxKnownPopupCleanerInstalled) return;
      window.__yxKnownPopupCleanerInstalled = true;

      const popupImagePaths = [
        '/group1/UIMG/20260413/b4b2ea46-5658-4d14-9f76-0f57bb514812.png',
        '/group1/UIMG/20260413/4c8d4010-f63d-43c9-b94e-bda2a602a928.png'
      ];

      function hideElement(el) {
        let target = el;
        for (let i = 0; i < 4 && target && target.parentElement; i += 1) {
          const style = getComputedStyle(target.parentElement);
          if (style.position === 'fixed' || style.position === 'absolute') {
            target = target.parentElement;
          } else {
            break;
          }
        }
        target.style.setProperty('display', 'none', 'important');
        target.style.setProperty('visibility', 'hidden', 'important');
        target.style.setProperty('pointer-events', 'none', 'important');
      }

      function clean() {
        for (const path of popupImagePaths) {
          document.querySelectorAll('img[src*="' + path + '"]').forEach(hideElement);
        }
      }

      clean();
      setInterval(clean, 1000);
      new MutationObserver(clean).observe(document.documentElement, { childList: true, subtree: true, attributes: true });
    })();
  `;

  view.webContents.executeJavaScript(script, true).catch(err => {
    console.warn('Known popup cleaner injection failed:', err.message);
  });
}

function installHeaderBypass() {
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    const headers = details.responseHeaders || {};
    for (const key of Object.keys(headers)) {
      const lower = key.toLowerCase();
      if (lower === 'x-frame-options' || lower === 'content-security-policy' || lower === 'content-security-policy-report-only') {
        delete headers[key];
      }
    }
    callback({ responseHeaders: headers });
  });
}

// ── CDP Playwright Connection ──────────────────────────────
async function connectPlaywrightToBrowserView() {
  const autom = require('./electron-automation.cjs');
  const { chromium } = require('playwright');

  // Fetch CDP targets from the debug port
  const http = require('node:http');
  const targets = await new Promise((resolve, reject) => {
    http.get(`http://localhost:${CDP_PORT}/json`, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });

  // Find the BrowserView page (not the electron-shell file:// page)
  const pageTargets = targets.filter(t => t.type === 'page');
  const target = pageTargets.find(t =>
    t.url.includes('yxlearning') || t.url.includes('baijiayun')
  ) || pageTargets.find(t => !t.url.startsWith('file://') && t.url !== 'about:blank')
    || pageTargets[0];

  if (!target) throw new Error('No CDP page target found for BrowserView');
  console.log(`CDP target found: ${target.url}`);

  // Connect Playwright at the browser level
  const browser = await chromium.connectOverCDP(`http://localhost:${CDP_PORT}`);

  // Find the matching page in Playwright
  let page = null;
  for (const ctx of browser.contexts()) {
    for (const p of ctx.pages()) {
      if (p.url() === target.url) { page = p; break; }
    }
    if (page) break;
  }

  if (!page) {
    // Fallback: use the most promising page
    const allPages = browser.contexts()[0]?.pages() || [];
    page = allPages.find(p => p.url().includes('yxlearning') || p.url().includes('baijiayun'))
      || allPages.find(p => !p.url().startsWith('file://') && p.url() !== 'about:blank')
      || allPages[allPages.length - 1];
  }

  console.log(`Automation page: ${page?.url()}`);
  return { browser, page };
}

// ── Run automation with callbacks wired to renderer ────────
async function startAutomation() {
  const autom = require('./electron-automation.cjs');

  // Configure callbacks: automation module calls notify(evt, data)
  // We patch the module's cb to forward to renderer
  autom._setCallback((evt, data) => {
    if (!win || win.isDestroyed()) return;
    switch (evt) {
      case 'log':
        win.webContents.send('log-entry', data);
        break;
      case 'phase':
        win.webContents.send('status-update', {
          running: data.running,
          phase: data.phase || '运行中',
          task: data.message || ''
        });
        break;
      case 'courses':
        win.webContents.send('courses-update', data);
        break;
      case 'exams':
        win.webContents.send('exams-update', data);
        break;
      case 'running':
        win.webContents.send('status-update', {
          running: data.running,
          phase: data.running ? '运行中' : '就绪',
          task: data.running ? '正在执行...' : '等待开始'
        });
        break;
    }
  });

  autom.configure({
    baseUrl: BASE_URL,
    examsOnly: EXAMS_ONLY,
    allowExamSubmit: ALLOW_EXAM_SUBMIT,
    proxyServer: PROXY_SERVER || undefined
  });

  win.webContents.send('status-update', {
    running: true,
    phase: '连接中',
    task: '正在准备自动化引擎...'
  });

  const { browser, page } = await connectPlaywrightToBrowserView();
  if (!page) {
    running = false;
    win.webContents.send('status-update', {
      running: false, phase: '错误', task: '无法连接到浏览器页面'
    });
    autom._clearCallback();
    return;
  }

  // Set up network trace for answer interception
  await autom.attachExamNetworkTrace(page);

  // Run the automation
  try {
    await autom.runAutomation(page);
  } catch (err) {
    console.error('Automation error:', err);
    win.webContents.send('status-update', {
      running: false, phase: '错误', task: err.message || '自动化执行出错'
    });
  }

  const state = autom.getState();
  running = false;
  win.webContents.send('status-update', {
    running: false,
    phase: state.stopRequested ? '已停止' : '完成',
    task: state.stopRequested ? '用户停止了学习' : '所有学习任务已完成'
  });
  autom._clearCallback();
}

// ── Run exam-only mode ──────────────────────────────────────
async function startExamsOnly() {
  const autom = require('./electron-automation.cjs');

  autom._setCallback((evt, data) => {
    if (!win || win.isDestroyed()) return;
    switch (evt) {
      case 'log':
        win.webContents.send('log-entry', data);
        break;
      case 'phase':
        win.webContents.send('status-update', {
          running: data.running,
          phase: data.phase || '考试中',
          task: data.message || ''
        });
        break;
      case 'courses':
        win.webContents.send('courses-update', data);
        break;
      case 'exams':
        win.webContents.send('exams-update', data);
        break;
      case 'running':
        win.webContents.send('status-update', {
          running: data.running,
          phase: data.running ? '考试中' : '就绪',
          task: data.running ? '正在答题...' : '等待开始'
        });
        break;
    }
  });

  autom.configure({
    baseUrl: BASE_URL,
    examsOnly: true,
    allowExamSubmit: ALLOW_EXAM_SUBMIT,
    proxyServer: PROXY_SERVER || undefined
  });

  win.webContents.send('status-update', {
    running: true,
    phase: '连接中',
    task: '正在准备考试自动化引擎...'
  });

  const { page } = await connectPlaywrightToBrowserView();
  if (!page) {
    running = false;
    win.webContents.send('status-update', {
      running: false, phase: '错误', task: '无法连接到浏览器页面'
    });
    autom._clearCallback();
    return;
  }

  await autom.attachExamNetworkTrace(page);

  try {
    await autom.runExamsOnly(page);
  } catch (err) {
    console.error('Exam automation error:', err);
    win.webContents.send('status-update', {
      running: false, phase: '错误', task: err.message || '考试自动化执行出错'
    });
  }

  const state = autom.getState();
  running = false;
  win.webContents.send('status-update', {
    running: false,
    phase: state.stopRequested ? '已停止' : '完成',
    task: state.stopRequested ? '用户停止了考试' : '所有考试已完成'
  });
  autom._clearCallback();
}

// ── IPC Handlers ───────────────────────────────────────────
ipcMain.handle('navigate', (_event, url) => {
  const target = normalizeUrl(url);
  view.webContents.loadURL(target);
  return target;
});

ipcMain.handle('browser-back', () => {
  if (view.webContents.canGoBack()) view.webContents.goBack();
});

ipcMain.handle('browser-forward', () => {
  if (view.webContents.canGoForward()) view.webContents.goForward();
});

ipcMain.handle('browser-refresh', () => {
  view.webContents.reload();
});

ipcMain.handle('start-learning', () => {
  if (running) {
    win.webContents.send('log-entry', { time: new Date().toLocaleTimeString(), text: '已有任务在运行中', level: 'warn' });
    return;
  }
  running = true;
  startedAt = Date.now();
  startAutomation();
});

ipcMain.handle('stop-learning', () => {
  const autom = require('./electron-automation.cjs');
  autom.stop();
  win.webContents.send('status-update', {
    running: true,
    phase: '停止中',
    task: '正在停止...将在当前任务完成后停止'
  });
});

ipcMain.handle('start-exam-only', () => {
  if (running) {
    win.webContents.send('log-entry', { time: new Date().toLocaleTimeString(), text: '已有任务在运行中', level: 'warn' });
    return;
  }
  running = true;
  startedAt = Date.now();
  startExamsOnly();
});

ipcMain.handle('window-minimize', () => win.minimize());
ipcMain.handle('window-maximize', () => {
  if (win.isMaximized()) win.unmaximize();
  else win.maximize();
});
ipcMain.handle('window-close', () => win.close());

ipcMain.handle('check-update', async () => {
  await shell.openExternal(UPDATE_URL);
  return UPDATE_URL;
});

function normalizeUrl(value) {
  const raw = String(value || DEFAULT_URL).trim() || DEFAULT_URL;
  return /^[a-z]+:\/\//i.test(raw) ? raw : `http://${raw}`;
}

// ── App Lifecycle ──────────────────────────────────────────
app.whenReady().then(() => {
  installHeaderBypass();
  createWindow();

  // Send runtime ticks to renderer
  setInterval(() => {
    if (running && startedAt && win && !win.isDestroyed()) {
      win.webContents.send('runtime-tick', { elapsed: Date.now() - startedAt });
    }
  }, 1000);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
