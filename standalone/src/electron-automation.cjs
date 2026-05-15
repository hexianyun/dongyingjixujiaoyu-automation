// Electron automation module — runs in Electron main process via CDP-connected Playwright
// Adapted from main.js for BrowserView (no iframe middleware)

const path = require('node:path');
const fs = require('node:fs/promises');
const { existsSync } = require('node:fs');

// ── Config ──────────────────────────────────────────────────
let BASE_URL = 'http://sddy.gxk.yxlearning.com';
let EXAMS_ONLY = false;
let ALLOW_EXAM_SUBMIT = true;
let TRACE_PROGRESS = false;
let CHROMIUM_EXECUTABLE = '';
let PROXY_SERVER = undefined;
const examResponseCache = [];
const TRACE_DIR = path.join(process.cwd(), 'progress-traces');
const learningSignal = {
  attached: false,
  lastSvAt: 0,
  lastCvAt: 0,
  lastCvSuccessAt: 0,
  lastCvPlayduration: 0,
  lastCvRate: 0,
  lastCvRespDesc: '',
  lastVideoId: '',
  activeVideoIndex: -1
};

// ── State ───────────────────────────────────────────────────
let stopRequested = false;
let phase = 'idle';
let running = false;
let cb = null; // callbacks

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function checkStop() { return stopRequested; }

// ── Helpers ─────────────────────────────────────────────────
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

async function textOf(locator) {
  const value = await locator.textContent({ timeout: 1000 }).catch(() => '');
  return String(value || '').trim();
}

function parseProgress(text) {
  const match = String(text || '').match(/([\d.]+)%/);
  return match ? parseFloat(match[1]) : 0;
}

function summarizeText(text) {
  const normalized = String(text || '').replace(/\s+/g, ' ').trim();
  return normalized.length > 800 ? `${normalized.slice(0, 800)}...` : normalized;
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

function cleanScalar(value) {
  if (value == null) return '';
  return String(value).trim();
}

async function appendJsonl(file, item) {
  await fs.appendFile(file, `${JSON.stringify({ at: new Date().toISOString(), ...item })}\n`, 'utf8').catch(() => {});
}

// ── Callback helpers ────────────────────────────────────────
function notify(evt, data) { if (cb) cb(evt, data); }
function sendLog(message, level) {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] ${message}`);
  notify('log', { time, text: message, level: level || 'info' });
}
function sendPhase(p, message) {
  phase = p;
  notify('phase', { phase: p, message: message || '', running });
}
function sendCourses(total, completed, current) {
  notify('courses', { total, completed, current: current || '' });
}
function sendExams(pending, completed, total) {
  notify('exams', { pending, completed: completed || 0, total: total || 0 });
}
function sendRunning(val) {
  running = val;
  notify('running', { running: val });
}

// ── Video/Player Helpers ───────────────────────────────────
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
          play.dispatchEvent(new MouseEvent(type, { bubbles: true, cancelable: true, view: window, clientX: r.left + r.width / 2, clientY: r.top + r.height / 2 }));
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

async function silenceMediaElements(page) {
  for (const frame of page.frames()) {
    await frame.evaluate(() => {
      document.querySelectorAll('video, audio').forEach(media => {
        media.muted = true;
        media.defaultMuted = true;
        media.volume = 0;
        media.setAttribute('muted', '');
      });
    }).catch(() => {});
  }
}

async function installMuteGuard(page) {
  for (const frame of page.frames()) {
    await frame.evaluate(() => {
      if (window.__yxMuteGuardInstalled) {
        document.querySelectorAll('video, audio').forEach(media => {
          media.muted = true;
          media.defaultMuted = true;
          media.volume = 0;
          media.setAttribute('muted', '');
        });
        return;
      }
      window.__yxMuteGuardInstalled = true;

      const enforceMediaMute = media => {
        if (!media) return;
        try {
          media.muted = true;
          media.defaultMuted = true;
          media.volume = 0;
          media.setAttribute('muted', '');
        } catch {}
      };

      const mediaProto = window.HTMLMediaElement && window.HTMLMediaElement.prototype;
      if (mediaProto) {
        const play = mediaProto.play;
        if (typeof play === 'function' && !mediaProto.__yxPlayWrapped) {
          mediaProto.play = function(...args) {
            enforceMediaMute(this);
            return play.apply(this, args);
          };
          mediaProto.__yxPlayWrapped = true;
        }

        const volumeDescriptor = Object.getOwnPropertyDescriptor(mediaProto, 'volume');
        if (volumeDescriptor && !mediaProto.__yxVolumeWrapped) {
          Object.defineProperty(mediaProto, 'volume', {
            configurable: true,
            enumerable: volumeDescriptor.enumerable,
            get() {
              return volumeDescriptor.get ? volumeDescriptor.get.call(this) : 0;
            },
            set(value) {
              const next = Number(value);
              return volumeDescriptor.set ? volumeDescriptor.set.call(this, Number.isFinite(next) && next <= 0 ? next : 0) : undefined;
            }
          });
          mediaProto.__yxVolumeWrapped = true;
        }

        const mutedDescriptor = Object.getOwnPropertyDescriptor(mediaProto, 'muted');
        if (mutedDescriptor && !mediaProto.__yxMutedWrapped) {
          Object.defineProperty(mediaProto, 'muted', {
            configurable: true,
            enumerable: mutedDescriptor.enumerable,
            get() {
              return mutedDescriptor.get ? mutedDescriptor.get.call(this) : true;
            },
            set(value) {
              return mutedDescriptor.set ? mutedDescriptor.set.call(this, value !== false) : undefined;
            }
          });
          mediaProto.__yxMutedWrapped = true;
        }
      }

      document.addEventListener('play', event => enforceMediaMute(event.target), true);
      document.addEventListener('playing', event => enforceMediaMute(event.target), true);
      document.addEventListener('loadedmetadata', event => enforceMediaMute(event.target), true);
      document.addEventListener('canplay', event => enforceMediaMute(event.target), true);
      document.addEventListener('volumechange', event => enforceMediaMute(event.target), true);

      const observer = new MutationObserver(() => {
        document.querySelectorAll('video, audio').forEach(enforceMediaMute);
      });
      observer.observe(document.documentElement || document.body, { childList: true, subtree: true });

      document.querySelectorAll('video, audio').forEach(enforceMediaMute);
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
        media.muted = true; media.defaultMuted = true; media.volume = 0;
        media.setAttribute('muted', '');
      });
      const mutedSelectors = ['#speaker.pv-icon-btn-volmute', '#speaker.bplayer-vol-muted',
        '.pv-volume.pv-icon-btn-volmute', '.bplayer-volume.bplayer-vol-muted',
        '.vjs-mute-control.vjs-vol-0', '.vjs-mute-control.vjs-muted'];
      if (mutedSelectors.some(sel => document.querySelector(sel))) return;
      const candidates = ['#speaker', '.pv-volume:not(.pv-icon-btn-volmute)',
        '.bplayer-volume.bplayer-vol-open', '.vjs-mute-control:not(.vjs-vol-0):not(.vjs-muted)',
        '[aria-label*="静音"]', '[title*="静音"]', '[class*="volume"]', '[class*="speaker"]', '[class*="sound"]'];
      const button = candidates.flatMap(sel => [...document.querySelectorAll(sel)])
        .find(el => visible(el) && !/muted|volmute|vol-0/i.test(String(el.className || '')));
      if (button) {
        const r = button.getBoundingClientRect();
        for (const type of ['mouseover', 'mousedown', 'mouseup', 'click']) {
          button.dispatchEvent(new MouseEvent(type, { bubbles: true, cancelable: true, view: window, clientX: r.left + r.width / 2, clientY: r.top + r.height / 2 }));
        }
      }
      document.querySelectorAll('video, audio').forEach(media => {
        media.muted = true; media.defaultMuted = true; media.volume = 0;
      });
    }).catch(() => {});
  }
}

async function clickVisiblePlayButton(page) {
  let clicked = false;
  for (const frame of page.frames()) {
    const result = await frame.evaluate(() => {
      const visible = el => {
        if (!el) return false;
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return r.width > 0 && r.height > 0 && cs.display !== 'none' && cs.visibility !== 'hidden' && cs.opacity !== '0';
      };
      const clickNatural = el => {
        const r = el.getBoundingClientRect();
        for (const type of ['mouseover', 'mousedown', 'mouseup', 'click']) {
          el.dispatchEvent(new MouseEvent(type, { bubbles: true, cancelable: true, view: window, clientX: r.left + r.width / 2, clientY: r.top + r.height / 2 }));
        }
      };
      const selectors = [
        '#play',
        '.bplayer-playbtn',
        '.bplayer-playpause.bplayer-btn-play',
        '.pv-playpause.pv-icon-btn-play',
        '.prism-big-play-btn',
        '.vjs-big-play-button',
        '.xgplayer-start',
        '.xgplayer-play'
      ];
      const button = selectors.flatMap(sel => [...document.querySelectorAll(sel)]).find(visible);
      if (!button) return false;
      clickNatural(button);
      return true;
    }).catch(() => false);
    if (result) clicked = true;
  }
  return clicked;
}

async function forcePlayerMutedUi(page) {
  for (const frame of page.frames()) {
    await frame.evaluate(() => {
      const visible = el => {
        if (!el) return false;
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return r.width > 0 && r.height > 0 && cs.display !== 'none' && cs.visibility !== 'hidden' && cs.opacity !== '0';
      };
      const clickNatural = el => {
        const r = el.getBoundingClientRect();
        for (const type of ['mouseover', 'mousedown', 'mouseup', 'click']) {
          el.dispatchEvent(new MouseEvent(type, { bubbles: true, cancelable: true, view: window, clientX: r.left + r.width / 2, clientY: r.top + r.height / 2 }));
        }
      };

      const volumeValue = document.querySelector('.volume-value');
      if (volumeValue) {
        volumeValue.textContent = '0';
      }

      const sliders = [...document.querySelectorAll('.bplayer-volume-bar, .bplayer-volume-now, .pv-volume-bar, .vjs-volume-level')];
      sliders.forEach(el => {
        if (el && el.style) {
          el.style.width = '0px';
          el.style.height = '0px';
        }
      });

      const candidates = [
        '.bplayer-volume-control',
        '.bplayer-volume',
        '#speaker',
        '.pv-volume',
        '.vjs-mute-control',
        '[aria-label*="静音"]',
        '[title*="静音"]'
      ];
      const button = candidates.flatMap(sel => [...document.querySelectorAll(sel)]).find(visible);
      if (button && !/muted|volmute|vol-0/i.test(String(button.className || ''))) {
        clickNatural(button);
      }

      document.querySelectorAll('video, audio').forEach(media => {
        media.muted = true;
        media.defaultMuted = true;
        media.volume = 0;
        media.setAttribute('muted', '');
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
      const popup = [...document.querySelectorAll('.bplayer-question-wrap, .question-modal-container, .pv-ask-modal-wrap')].find(visible);
      if (!popup) return;
      const clickNatural = el => {
        const r = el.getBoundingClientRect();
        for (const type of ['mouseover', 'mousedown', 'mouseup', 'click']) {
          el.dispatchEvent(new MouseEvent(type, { bubbles: true, cancelable: true, view: window, clientX: r.left + r.width / 2, clientY: r.top + r.height / 2 }));
        }
      };
      const options = [...popup.querySelectorAll('.options .option-item, .option-item, .answer-item, label, li')]
        .filter(visible).filter(el => el.textContent.trim())
        .filter((el, i, arr) => arr.findIndex(item => item.textContent.trim() === el.textContent.trim()) === i);
      const buttons = [...popup.querySelectorAll('button, .bplayer-btn, .confirm-button, .pv-ask-submit, [role="button"]')]
        .filter(visible).filter(el => el.textContent.trim() || el.className);
      const retry = buttons.find(el => /重试|再试|重新|继续答题|继续作答/.test(el.textContent.trim()));
      if (retry) { clickNatural(retry); return; }
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
      if (state.key !== key) { window.__learningQuestionState = { key, tried: [], lastAt: 0 }; }
      const currentState = window.__learningQuestionState;
      if (Date.now() - currentState.lastAt < 1200) return;
      const selected = el => {
        const input = el.matches('input') ? el : el.querySelector('input');
        if (input && ['checkbox', 'radio'].includes(input.type)) return input.checked;
        const className = String(el.className || '');
        return el.getAttribute('aria-checked') === 'true' || /(^|\s)(active|selected|checked|current|choosed|on)(\s|$)/i.test(className);
      };
      const hasCheckbox = options.some(el => el.querySelector('input[type="checkbox"]') || el.matches('input[type="checkbox"]'));
      const hasRadio = options.some(el => el.querySelector('input[type="radio"]') || el.matches('input[type="radio"]'));
      const isMulti = hasCheckbox || (!hasRadio && /多选|多项|不定项/.test(popup.textContent));
      const optionCount = Math.min(options.length, 8);
      const makeCombos = () => {
        if (!isMulti) return Array.from({ length: optionCount }, (_, i) => [i]);
        const combos = [Array.from({ length: optionCount }, (_, i) => i)];
        for (let mask = (1 << optionCount) - 2; mask >= 1; mask--) {
          const combo = [];
          for (let i = 0; i < optionCount; i++) { if (mask & (1 << i)) combo.push(i); }
          combos.push(combo);
        }
        return combos.sort((a, b) => b.length - a.length);
      };
      const comboKey = combo => combo.join(',');
      const combo = makeCombos().find(item => !currentState.tried.includes(comboKey(item)));
      if (!combo) return;
      const desired = new Set(combo);
      for (let i = 0; i < optionCount; i++) {
        if (selected(options[i]) !== desired.has(i)) clickNatural(options[i]);
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
      return { currentTime: v.currentTime || 0, duration: v.duration || 0, paused: v.paused, ended: v.ended, src: v.currentSrc || v.src || '' };
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

function readResponseJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

async function attachLearningSignals(page) {
  if (learningSignal.attached) return;
  learningSignal.attached = true;

  page.on('response', async response => {
    const url = response.url();
    if (!/\/train\/cms\/my-video\/(sv|cv)\.gson/i.test(url)) return;
    const body = await response.text().catch(() => '');
    const json = readResponseJson(body);
    const now = Date.now();
    if (!json || typeof json !== 'object') return;

    if (/\/sv\.gson/i.test(url)) {
      learningSignal.lastSvAt = now;
      return;
    }

    learningSignal.lastCvAt = now;
    learningSignal.lastCvRespDesc = String(json.respDesc || '');
    learningSignal.lastCvRate = Number.parseFloat(json.videoLearnRate) || 0;
    const watchInfo = json.watchInfo && typeof json.watchInfo === 'object' ? json.watchInfo : null;
    learningSignal.lastCvPlayduration = Number.parseFloat(watchInfo?.playduration) || learningSignal.lastCvPlayduration || 0;
    learningSignal.lastVideoId = String(watchInfo?.vid || json.videoId || learningSignal.lastVideoId || '');
    if (/正常计时|success/i.test(learningSignal.lastCvRespDesc) || learningSignal.lastCvPlayduration > 0 || learningSignal.lastCvRate > 0) {
      learningSignal.lastCvSuccessAt = now;
    }
  });
}

function recentLearningHeartbeat(maxAgeMs = 45000) {
  return !!learningSignal.lastCvSuccessAt && (Date.now() - learningSignal.lastCvSuccessAt <= maxAgeMs);
}

async function isInitializationProgressDialogVisible(page) {
  for (const frame of page.frames()) {
    const visible = await frame.evaluate(() => {
      const isVisible = el => {
        if (!el) return false;
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return r.width > 0 && r.height > 0 && cs.display !== 'none' && cs.visibility !== 'hidden' && cs.opacity !== '0';
      };
      return [...document.querySelectorAll('body *')].some(el => isVisible(el) && /初始化进度异常|请重新点击播放按钮/.test((el.textContent || '').replace(/\s+/g, ' ').trim()));
    }).catch(() => false);
    if (visible) return true;
  }
  return false;
}

async function recoverInitializationProgressDialog(page) {
  let handled = false;
  for (const frame of page.frames()) {
    const result = await frame.evaluate(() => {
      const isVisible = el => {
        if (!el) return false;
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return r.width > 0 && r.height > 0 && cs.display !== 'none' && cs.visibility !== 'hidden' && cs.opacity !== '0';
      };
      const text = el => (el.textContent || '').replace(/\s+/g, ' ').trim();
      const dialog = [...document.querySelectorAll('body *')].find(el => isVisible(el) && /初始化进度异常|请重新点击播放按钮/.test(text(el)));
      if (!dialog) return false;
      const clickNatural = el => {
        const r = el.getBoundingClientRect();
        for (const type of ['mouseover', 'mousedown', 'mouseup', 'click']) {
          el.dispatchEvent(new MouseEvent(type, { bubbles: true, cancelable: true, view: window, clientX: r.left + r.width / 2, clientY: r.top + r.height / 2 }));
        }
      };
      const button = [dialog, dialog.parentElement, document]
        .filter(Boolean)
        .flatMap(root => [...root.querySelectorAll ? root.querySelectorAll('button, a, .layui-layer-btn0, [role=\"button\"], .btn') : []])
        .find(el => isVisible(el) && /确定|确认|继续/.test(text(el) || String(el.className || '')));
      if (!button) return false;
      clickNatural(button);
      return true;
    }).catch(() => false);
    if (result) handled = true;
  }
  if (handled) {
    sendLog('检测到初始化进度异常弹窗，已点击确定并准备重试播放', 'warn');
    await sleep(800);
  }
  return handled;
}

async function waitForPlayerReady(page, timeoutMs = 15000) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    const ready = await page.evaluate(() => {
      const visible = el => {
        if (!el) return false;
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return r.width > 0 && r.height > 0 && cs.display !== 'none' && cs.visibility !== 'hidden';
      };
      const hasPlayableVideo = [...document.querySelectorAll('video')].some(v => visible(v) && (v.readyState >= 2 || Number.isFinite(v.duration) || v.currentSrc || v.src));
      const hasPlayer = !!document.querySelector('.bplayer-wrap, .pv-video-player, .polyv-video-player, [id*=player], [class*=player]');
      const hasPlayButton = ['#play', '.bplayer-playbtn', '.bplayer-playpause', '.pv-playpause', '.prism-big-play-btn', '.vjs-big-play-button']
        .some(sel => [...document.querySelectorAll(sel)].some(visible));
      return hasPlayableVideo || (hasPlayer && hasPlayButton);
    }).catch(() => false);
    if (ready) return true;
    await sleep(500);
  }
  return false;
}

async function waitForLearningHeartbeat(page, timeoutMs = 30000) {
  const startedAt = Date.now();
  let lastPlayAttemptAt = 0;
  let retryCount = 0;

  while (Date.now() - startedAt < timeoutMs) {
    if (recentLearningHeartbeat()) return true;
    await installMuteGuard(page);
    await silenceMediaElements(page);
    await forcePlayerMutedUi(page);
    await handleQuestionPopups(page);

    if (await recoverInitializationProgressDialog(page)) {
      retryCount++;
      await clickVisiblePlayButton(page);
      lastPlayAttemptAt = Date.now();
    }

    const shouldRetryPlay = !lastPlayAttemptAt || (Date.now() - lastPlayAttemptAt >= 5000);
    if (shouldRetryPlay) {
      await clickVisiblePlayButton(page);
      lastPlayAttemptAt = Date.now();
    }

    if (TRACE_PROGRESS && (retryCount > 0 || Date.now() - startedAt > 8000)) {
      await captureLearningSnapshot(page, 'waiting-learning-heartbeat', {
        activeVideoIndex: learningSignal.activeVideoIndex,
        retryCount,
        lastCvAt: learningSignal.lastCvAt,
        lastCvSuccessAt: learningSignal.lastCvSuccessAt,
        lastCvRate: learningSignal.lastCvRate,
        lastCvPlayduration: learningSignal.lastCvPlayduration,
        lastCvRespDesc: learningSignal.lastCvRespDesc
      });
    }

    await sleep(1000);
  }
  return recentLearningHeartbeat();
}

async function startVideoPlayback(page, videoIndex) {
  learningSignal.activeVideoIndex = videoIndex;
  learningSignal.lastSvAt = 0;
  learningSignal.lastCvAt = 0;
  learningSignal.lastCvSuccessAt = 0;
  learningSignal.lastCvPlayduration = 0;
  learningSignal.lastCvRate = 0;
  learningSignal.lastCvRespDesc = '';
  learningSignal.lastVideoId = '';

  await installMuteGuard(page);
  await silenceMediaElements(page);
  await forcePlayerMutedUi(page);
  await waitForPlayerReady(page, 15000);
  await installMuteGuard(page);
  await muteAllFrames(page);
  await forcePlayerMutedUi(page);
  await clickVisiblePlayButton(page);
  const started = await waitForLearningHeartbeat(page, 30000);
  if (!started) {
    const hasInitDialog = await isInitializationProgressDialogVisible(page);
    if (hasInitDialog) {
      throw new Error(`视频 ${videoIndex + 1} 初始化进度异常，重试后仍未恢复`);
    }
    sendLog(`视频 ${videoIndex + 1} 在初始化窗口内未观察到计时心跳，转入保守恢复模式`, 'warn');
  } else {
    sendLog(`视频 ${videoIndex + 1} 已建立计时心跳，进入持续学习`, 'info');
  }
  await installMuteGuard(page);
  await muteAllFrames(page);
  await forcePlayerMutedUi(page);
  return started;
}

async function logPageState(page, reason) {
  const state = await page.evaluate(() => ({
    title: document.title,
    url: location.href,
    text: document.body?.innerText?.replace(/\s+/g, ' ').trim().slice(0, 500) || ''
  })).catch(err => ({ title: '', url: page.url(), text: `evaluate failed: ${err.message}` }));
  sendLog(`Page state (${reason}): url=${state.url} title=${state.title} text=${state.text}`);
}

async function firstVisibleLocator(locators) {
  for (const locator of locators) {
    if (await locator.isVisible().catch(() => false)) return locator;
  }
  return null;
}

async function captureLearningSnapshot(page, reason, extra = {}) {
  if (!TRACE_PROGRESS) return;
  await fs.mkdir(TRACE_DIR, { recursive: true }).catch(() => {});
  const traceFile = path.join(TRACE_DIR, 'learning-popup-diagnostics.jsonl');
  const snapshot = await page.evaluate(() => {
    const visible = el => {
      if (!el) return false;
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return r.width > 0 && r.height > 0 && cs.display !== 'none' && cs.visibility !== 'hidden' && cs.opacity !== '0';
    };
    const text = el => (el.textContent || '').replace(/\s+/g, ' ').trim();
    const dialogNodes = [...document.querySelectorAll('body *')]
      .filter(visible)
      .filter(el => /提示|确定|初始化进度异常|播放按钮|重新点击/.test(text(el)))
      .slice(0, 8)
      .map(el => ({
        tag: el.tagName,
        id: el.id,
        className: String(el.className || ''),
        text: text(el).slice(0, 300),
        html: el.outerHTML.slice(0, 1500)
      }));
    const player = document.querySelector('.bplayer-wrap, .pv-video-player, .polyv-video-player, [id*=player], [class*=player]');
    const videos = [...document.querySelectorAll('video')].slice(0, 5).map(v => ({
      currentTime: v.currentTime || 0,
      duration: Number.isFinite(v.duration) ? v.duration : null,
      paused: !!v.paused,
      ended: !!v.ended,
      readyState: v.readyState,
      src: String(v.currentSrc || v.src || '').slice(0, 300)
    }));
    return {
      href: location.href,
      title: document.title,
      bodyText: (document.body?.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 1200),
      dialogNodes,
      player: player ? {
        tag: player.tagName,
        id: player.id,
        className: String(player.className || ''),
        text: text(player).slice(0, 1200)
      } : null,
      videos
    };
  }).catch(err => ({ href: page.url(), error: err.message }));
  await appendJsonl(traceFile, { type: 'learning-snapshot', reason, snapshot, extra });
}

async function attachProgressTrace(page) {
  await fs.mkdir(TRACE_DIR, { recursive: true });
  const traceFile = path.join(TRACE_DIR, `progress-${new Date().toISOString().replace(/[:.]/g, '-')}.jsonl`);
  const interesting = /progress|study|learn|heart|time|record|watch|finish|video|course|lesson|log|save|update|play|exam|paper|submit|answer/i;

  page.on('request', async request => {
    const url = request.url();
    if (!interesting.test(url)) return;
    await appendJsonl(traceFile, {
      type: 'request',
      method: request.method(),
      url: redactUrl(url),
      postData: summarizeText(request.postData() || '')
    });
  });

  page.on('response', async response => {
    const request = response.request();
    const url = response.url();
    if (!interesting.test(url)) return;
    const video = await readBestVideoState(page).catch(() => null);
    const text = await response.text().catch(() => '');
    await appendJsonl(traceFile, {
      type: 'response',
      method: request.method(),
      url: redactUrl(url),
      status: response.status(),
      video,
      body: summarizeText(text)
    });
  });

  sendLog(`进度观测已开启: ${traceFile}`);
}

// ── Exam Capture Helpers ───────────────────────────────────
function rememberExamResponse(entry) {
  if (!entry?.body) return;
  let json;
  try { json = JSON.parse(entry.body); } catch { return; }
  const answerPlan = extractAnswerPlan(json);
  const paperId = findFirstDeepValue(json, /paperId/i);
  const myExamRecordId = findFirstDeepValue(json, /myExamRecordId/i);
  const score = answerPlan.length * 100 + (paperId ? 10 : 0) + (myExamRecordId ? 5 : 0);
  if (!score) return;
  examResponseCache.unshift({
    at: new Date().toISOString(), url: entry.url, status: entry.status,
    contentType: entry.contentType, json, answerPlanSize: answerPlan.length,
    paperId: cleanScalar(paperId), myExamRecordId: cleanScalar(myExamRecordId)
  });
  if (examResponseCache.length > 20) examResponseCache.length = 20;
}

function findCachedExamPayload({ paperId, myExamRecordId, pageUrl }) {
  const normalizedRecordId = cleanScalar(myExamRecordId);
  const normalizedPaperId = cleanScalar(paperId);
  const ranked = examResponseCache
    .map(item => ({ ...item, rank: scoreCachedExamPayload(item, { paperId: normalizedPaperId, myExamRecordId: normalizedRecordId, pageUrl }) }))
    .filter(item => item.rank > 0).sort((a, b) => b.rank - a.rank);
  if (!ranked.length) return null;
  const best = ranked[0];
  return { url: best.url, json: best.json, paperId: best.paperId, myExamRecordId: best.myExamRecordId, note: `Recovered from cached XHR with rank ${best.rank}` };
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
  const result = await page.evaluate(() => {
    const clean = value => typeof value === 'string' ? value.trim() : value;
    const seen = new WeakSet();
    const candidates = [];
    const isObject = value => value && typeof value === 'object';
    const looksInteresting = key => /paper|exam|question|answer|record/i.test(String(key || ''));
    const visit = (value, path) => {
      if (!isObject(value) || seen.has(value)) return;
      seen.add(value);
      let text = '';
      try { text = JSON.stringify(value).slice(0, 4000); } catch { text = ''; }
      if (/(isRight|isCorrect|standardAnswer|correctAnswer|questionName|optionName)/.test(text)) {
        candidates.push({ path, value, paperId: clean(value.paperId), myExamRecordId: clean(value.myExamRecordId) });
      }
      for (const [key, child] of Object.entries(value)) {
        if (!isObject(child)) continue;
        if (looksInteresting(key) || path === 'window') { visit(child, `${path}.${key}`); }
      }
    };
    for (const key of Object.keys(window)) {
      try { if (!looksInteresting(key)) continue; visit(window[key], `window.${key}`); } catch {}
    }
    return candidates.slice(0, 10).map(item => ({ path: item.path, paperId: item.paperId || null, myExamRecordId: item.myExamRecordId || null, value: item.value }));
  }).catch(() => []);

  for (const item of result) {
    const answerPlan = extractAnswerPlan(item.value);
    if (!answerPlan.length) continue;
    return { url: item.path, json: item.value, paperId: item.paperId, myExamRecordId: item.myExamRecordId, note: `Recovered from runtime object ${item.path}` };
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
      if (child && typeof child === 'object') { const nested = visit(child); if (nested != null && nested !== '') return nested; }
    }
    return undefined;
  };
  return visit(root);
}

function extractAnswerPlan(api) {
  const result = [];
  const seen = new WeakSet();
  const clean = value => String(value ?? '').replace(/\s+/g, ' ').trim();
  const stripHtml = value => String(value ?? '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  const splitIds = value => new Set(clean(value).split(/[,\s;|]+/).filter(Boolean));
  const firstText = (obj, keys) => { for (const key of keys) { const val = obj?.[key]; if (typeof val === 'string' || typeof val === 'number') { const t = clean(val); if (t) return t; } } return ''; };
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
      const options = value.map(option => ({ id: firstId(option), text: optionText(option), correct: hasCorrectFlag(option) })).filter(o => o.id || o.text);
      if (!options.length) continue;
      const standardIds = splitIds(firstText(obj, ['standardId', 'standardIds', 'answerId', 'answerIds', 'rightAnswerId', 'rightAnswerIds', 'correctAnswerId', 'correctAnswerIds']));
      const answerText = firstText(obj, ['answer', 'rightAnswer', 'correctAnswer', 'standardAnswerText']);
      const correct = options.filter(option => {
        if (option.correct) return true;
        if (option.id && standardIds.has(option.id)) return true;
        if (answerText && option.text && answerText.includes(option.text)) return true;
        return false;
      });
      if (correct.length) { result.push({ text: stripHtml(questionText(obj)), correct: correct.map(o => ({ id: o.id, text: o.text })) }); }
    }
    for (const value of Object.values(obj)) { if (value && typeof value === 'object') visit(value); }
  };
  visit(api);
  const unique = [];
  const keys = new Set();
  for (const item of result) {
    const key = `${item.text}|${item.correct.map(o => o.id || o.text).join(',')}`;
    if (keys.has(key)) continue;
    keys.add(key);
    unique.push(item);
  }
  return unique;
}

function buildFallbackAnswerPlan(api) {
  // Build answer plan from API data. The API has TWO representations:
  // - paperQuestionRPS: all standardAnswer=null (exam-taker view)
  // - listPaperQuestionRP: standardAnswer=1 for correct, 0 for wrong
  // We prioritize listPaperQuestionRP which has actual answers.
  if (!api || typeof api !== 'object') return [];
  const clean = value => String(value ?? '').replace(/\s+/g, ' ').trim();

  const stems = api?.attribute?.data?.questionStemRPS;
  if (!stems || !Array.isArray(stems)) return [];

  const result = [];
  for (const stem of stems) {
    // Prioritize listPaperQuestionRP (has answers), fall back to paperQuestionRPS
    const questions = stem?.listPaperQuestionRP || stem?.paperQuestionRPS;
    if (!Array.isArray(questions)) continue;
    for (const q of questions) {
      const text = clean(q.questionName || '');
      const qType = q.type; // 1=判断, 2=单选, 3=多选
      const options = (q.paperOptionRPS || []).map(o => ({
        id: o.paperOptionId || '',
        text: clean(o.context || o.optionName || ''),
        optionNo: o.optionNo,
        standardAnswer: o.standardAnswer
      }));

      let correct = [];
      // Check if options have actual standardAnswer values (from listPaperQuestionRP)
      const hasAnswers = options.some(o => o.standardAnswer != null && o.standardAnswer !== '');
      if (hasAnswers) {
        // Use actual correct answers from the API
        correct = options.filter(o => o.standardAnswer === 1 || o.standardAnswer === true || String(o.standardAnswer) === '1');
      } else {
        // Fallback heuristic when no answers available
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

// ── Login ──────────────────────────────────────────────────
async function waitForLoginIfNeeded(page) {
  const isLoginPage = async () => page.evaluate(() => {
    const text = document.body?.innerText || '';
    return location.href.includes('/login') || /登录|鐧诲綍/.test(text);
  }).catch(() => page.url().includes('/login'));

  if (!(await isLoginPage())) return;

  sendLog('Login required: waiting for manual login...');
  const startedAt = Date.now();
  while (Date.now() - startedAt < 10 * 60 * 1000) {
    await sleep(3000);
    if (checkStop()) throw new Error('User stopped');
    if (!(await isLoginPage())) {
      sendLog(`Login detected: ${page.url()}`);
      return;
    }
  }
  throw new Error('Timed out waiting for login');
}

// ── Learning Flow ──────────────────────────────────────────
async function runAutomation(page) {
  stopRequested = false;
  running = true;
  sendRunning(true);

  sendLog(`访问地址: ${BASE_URL}/login`);
  if (PROXY_SERVER) sendLog(`使用代理: ${PROXY_SERVER}`);

  // Navigate to start page
  const startPath = EXAMS_ONLY ? '/my/exam' : '/login';
  await page.goto(`${BASE_URL}${startPath}`, { waitUntil: 'domcontentloaded' });

  // Wait for login
  sendPhase('login', '正在登录，请在浏览器中输入账号密码...');
  await waitForLoginIfNeeded(page);
  await attachLearningSignals(page);
  if (TRACE_PROGRESS) await attachProgressTrace(page);
  if (checkStop()) { sendPhase('idle', '已停止'); sendRunning(false); return; }

  if (EXAMS_ONLY) {
    await checkOnlineExams(page);
  } else {
    await runLearning(page);
  }

  if (!stopRequested) {
    sendPhase('done', '所有任务已完成');
    sendRunning(false);
  } else {
    sendPhase('idle', '已停止');
    sendRunning(false);
  }
}

async function runLearning(page) {
  sendLog('===== 阶段1: 自动学习课程视频 =====', 'phase');
  sendPhase('learning', '正在学习课程视频...');

  while (true) {
    if (checkStop()) { sendLog('停止: 用户中断学习', 'warn'); return; }

    await ensureLearningPage(page);
    // Retry card loading — AngularJS might render cards asynchronously
    let allCards = [];
    let totalCourses = 0;
    let completedCourses = 0;
    for (let retry = 0; retry < 5; retry++) {
      allCards = await page.locator('.col-xs-12.col-sm-12.col-md-6.col-lg-4').all();
      totalCourses = allCards.length;
      if (totalCourses > 0) break;
      await sleep(1500);
    }
    if (totalCourses > 0) {
      for (const card of allCards) {
        const progressText = await textOf(card.locator('.sr-only').first());
        const barStyle = await card.locator('.progress-bar').first().getAttribute('style').catch(() => '');
        const progress = parseProgress(progressText || barStyle || '');
        if (progress >= 100) completedCourses++;
      }
    }
    // Always send stats, even if 0 courses found
    sendCourses(totalCourses, completedCourses, '');

    const course = await findFirstIncompleteCourse(page);
    if (!course) {
      sendLog('所有课程视频已完成，进入考试阶段');
      sendLog('===== 阶段2: 在线考试 =====', 'phase');
      await checkOnlineExams(page);
      sendLog('===== 全部任务完成 =====', 'phase');
      return;
    }

    sendLog(`进入课程: ${course.title} (进度 ${course.progress}%)`);
    sendCourses(totalCourses, completedCourses, course.title);
    await course.locator.click({ force: true });
    await waitForCoursePage(page);
    await captureLearningSnapshot(page, 'course-page-ready');
    await playCourseVideos(page);

    if (checkStop()) { sendLog('停止: 用户中断学习', 'warn'); return; }

    await page.goto(`${BASE_URL}/my/learning`, { waitUntil: 'domcontentloaded' });
    await sleep(2000);
  }
}

async function ensureLearningPage(page) {
  if (!page.url().includes('/my/learning')) {
    await page.goto(`${BASE_URL}/my/learning`, { waitUntil: 'domcontentloaded' });
  }
  await page.waitForLoadState('domcontentloaded').catch(() => {});
  await sleep(2000);
}

async function findFirstIncompleteCourse(page) {
  for (let retry = 0; retry < 10; retry++) {
    const cards = await page.locator('.col-xs-12.col-sm-12.col-md-6.col-lg-4').all();
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
    if (await page.locator('li.videoLi').count().catch(() => 0)) return;
    await sleep(1000);
  }
}

async function playCourseVideos(page) {
  while (true) {
    const videos = await getVideoItems(page);
    const pending = videos.filter(v => v.progress < 100 && !v.finished);
    if (!pending.length) { sendLog('当前课程视频已完成'); return; }
    const item = pending[0];
    sendLog(`播放视频: ${item.index + 1}/${videos.length}, 当前进度 ${item.progress}%`);
    await captureLearningSnapshot(page, 'before-video-click', { videoIndex: item.index, progress: item.progress });
    await item.locator.click({ force: true });
    await sleep(1000);
    await captureLearningSnapshot(page, 'after-video-click', { videoIndex: item.index, progress: item.progress });
    await startVideoPlayback(page, item.index);
    await waitVideoDone(page, item.index);
  }
}

async function getVideoItems(page) {
  const rows = await page.locator('li.videoLi').all();
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
  let heartbeatMisses = 0;
  const startedAt = Date.now();
  let iteration = 0;

  while (Date.now() - startedAt < 6 * 60 * 60 * 1000) {
    if (checkStop()) { sendLog('Stop: user interrupted video playback', 'warn'); return; }
    await installMuteGuard(page);
    await silenceMediaElements(page);
    await forcePlayerMutedUi(page);
    await handleQuestionPopups(page);
    iteration++;

    if (await recoverInitializationProgressDialog(page)) {
      await clickVisiblePlayButton(page);
      await waitForLearningHeartbeat(page, 12000);
    }

    const rows = await getVideoItems(page);
    const current = rows[videoIndex];
    if (current && (current.progress >= 100 || current.finished)) {
      sendLog(`Video completed: ${videoIndex + 1}`);
      return;
    }

    const state = await readBestVideoState(page);
    if (iteration <= 4 || stall >= 4 || heartbeatMisses >= 4) {
      await captureLearningSnapshot(page, 'wait-video-loop', {
        videoIndex,
        iteration,
        stall,
        heartbeatMisses,
        state,
        currentProgress: current?.progress ?? null,
        currentFinished: !!current?.finished,
        lastCvAt: learningSignal.lastCvAt,
        lastCvSuccessAt: learningSignal.lastCvSuccessAt,
        lastCvRate: learningSignal.lastCvRate,
        lastCvPlayduration: learningSignal.lastCvPlayduration
      });
    }
    if (state?.ended) return;

    if (recentLearningHeartbeat()) {
      heartbeatMisses = 0;
      await keepAllFramesPlaying(page);
    } else {
      heartbeatMisses++;
      if (heartbeatMisses >= 5) {
        sendLog('Learning heartbeat interrupted, retrying playback', 'warn');
        await clickVisiblePlayButton(page);
        await waitForLearningHeartbeat(page, 15000);
        heartbeatMisses = 0;
      }
    }

    if (state && state.currentTime > 0 && recentLearningHeartbeat(90000)) {
      if (Math.abs(state.currentTime - lastTime) < 0.2) { stall++; } else { stall = 0; lastTime = state.currentTime; }
      if (stall >= 5) {
        sendLog('Playback appears stalled, trying fallback recovery', 'warn');
        await clickPlayFallbacks(page);
        stall = 0;
      }
    }
    await sleep(3000);
  }
  throw new Error(`Timed out waiting for video ${videoIndex + 1} to finish`);
}

// Exam Flow
async function checkOnlineExams(page) {
  sendLog('进入在线考试页面');
  sendPhase('exams', '正在进入考试页面...');
  await page.goto(`${BASE_URL}/my/exam`, { waitUntil: 'domcontentloaded' }).catch(err => {
    sendLog(`Exam page navigation interrupted: ${err.message}`);
  });
  await waitForLoginIfNeeded(page);
  if (!page.url().includes('/my/exam')) {
    await page.goto(`${BASE_URL}/my/exam`, { waitUntil: 'domcontentloaded' }).catch(err => {
      sendLog(`Exam page navigation failed after login: ${err.message}`);
    });
  }
  await page.waitForLoadState('domcontentloaded').catch(() => {});
  await sleep(2000);

  const pendingTab = page.locator('[du-click="pendingexambtn"]').first();
  if (await pendingTab.count().catch(() => 0)) {
    await pendingTab.click({ force: true }).catch(() => {});
    await sleep(1000);
  }

  const summary = await readPendingExamSummary(page);
  sendLog(`待参加考试数量: ${summary.pendingCount}`);
  sendExams(summary.pendingCount, 0, summary.exams.length);
  sendPhase('exams', `共 ${summary.exams.length} 个考试，${summary.pendingCount} 个待考`);

  if (!summary.exams.length) {
    await logPageState(page, 'no exams found');
    sendLog('没有待考试科目');
    return;
  }

  for (let i = 0; i < summary.exams.length; i++) {
    const exam = summary.exams[i];
    sendLog(`待考 ${i + 1}/${summary.exams.length}: ${exam.title} | 状态 ${exam.status || '-'} | 次数 ${exam.attempts || '-'} | 成绩 ${exam.score || '-'}`);
  }

  if (!ALLOW_EXAM_SUBMIT) {
    sendLog('提示: 考试提交未启用，设置 ALLOW_EXAM_SUBMIT=1 可自动提交考试');
  }
  await processPendingExams(page);
}

async function readPendingExamSummary(page) {
  return page.evaluate(() => {
    const text = el => (el?.textContent || '').replace(/\s+/g, ' ').trim();
    const pendingCountText = text(document.querySelector('[du-html="pendingexam"], .text-blue'));
    const pendingCount = Number.parseInt(pendingCountText, 10) || 0;
    const rows = [...document.querySelectorAll('#joined tbody tr, table.table tbody tr')]
      .filter(row => text(row).includes('待考试') || row.querySelector('button[btn-name="toExam"]'));
    const exams = rows.map(row => {
      const cells = [...row.querySelectorAll('td')];
      const titleEl = row.querySelector('.title[title], .ellipsis-2[title], .orderright .title');
      const title = titleEl?.getAttribute('title') || text(titleEl) || text(cells[0]);
      return { title, deadline: text(cells[1]), status: text(cells[2]), attempts: text(cells[3]), score: text(cells[4]), canEnter: !!row.querySelector('button[btn-name="toExam"]') };
    }).filter(item => item.title);
    return { pendingCount: pendingCount || exams.length, exams };
  }).catch(() => ({ pendingCount: 0, exams: [] }));
}

async function processPendingExams(page) {
  let completed = 0;
  const processedTitles = new Set();

  while (true) {
    if (checkStop()) { sendLog('停止: 用户中断考试', 'warn'); return; }

    await page.goto(`${BASE_URL}/my/exam`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForLoadState('domcontentloaded').catch(() => {});
    await sleep(2000);
    sendLog(`[DIAG] After goto /my/exam: url=${page.url()}`);

    // If redirected to login, wait for user to log in
    if (page.url().includes('/login')) {
      sendLog('检测到登录页面，请在浏览器窗口中登录...');
      sendPhase('login', '等待登录...');
      for (let i = 0; i < 120; i++) {
        if (checkStop()) return;
        await sleep(2000);
        if (!page.url().includes('/login')) {
          sendLog('登录成功，继续...');
          // Re-navigate to exam page
          await page.goto(`${BASE_URL}/my/exam`, { waitUntil: 'domcontentloaded', timeout: 15000 });
          await page.waitForLoadState('domcontentloaded').catch(() => {});
          await sleep(2000);
          break;
        }
        if (i === 0) sendLog('等待手动登录（最长4分钟）...');
      }
      if (page.url().includes('/login')) {
        sendLog('登录超时，请登录后重试');
        sendPhase('idle', '等待登录超时');
        return;
      }
    }

    const pendingTab = page.locator('[du-click="pendingexambtn"]').first();
    const tabCount = await pendingTab.count().catch(() => 0);
    sendLog(`[DIAG] pendingTab count=${tabCount}`);
    if (tabCount) {
      await pendingTab.click({ force: true }).catch(() => {});
      await sleep(1500);
      sendLog(`[DIAG] Clicked pending tab, url=${page.url()}`);
    }

    const exam = await getFirstEnterableExam(page, processedTitles);
    if (!exam) {
      sendLog(`Exam processing finished, submitted ${completed} exam(s) this run`);
      sendExams(0, completed, processedTitles.size);
      return;
    }

    completed++;
    sendLog(`Entering formal exam ${completed}: ${exam.title}`);
    sendExams(Math.max(0, processedTitles.size + 1 - completed + 1), completed - 1, processedTitles.size + 1);
    sendPhase('exams', `正在答题: ${exam.title}`);
    await exam.button.click({ force: true });
    await sleep(2500);
    await enterFormalExam(page);

    const ready = await waitForExamReady(page);
    if (!ready) {
      await logPageState(page, 'exam not ready; skip answer');
      sendLog('Exam not ready: exam page not detected — will retry', 'warn');
      // Don't add to processedTitles — allow retry on next loop iteration
      await sleep(2000);
      continue;
    }

    const apiReady = await waitForExamApiData(page);
    if (!apiReady) {
      await logPageState(page, 'exam api data timeout');
      sendLog('Exam API data did not arrive — will retry', 'warn');
      await sleep(2000);
      continue;
    }

    const capture = await captureCurrentExam(page);
    await saveExamCapture(capture);
    let answerPlan = extractAnswerPlan(capture.api);
    if (!answerPlan.length) {
      answerPlan = buildFallbackAnswerPlan(capture.api);
      if (answerPlan.length) {
        sendLog(`Using fallback answer plan (API has no correct answers): ${answerPlan.length} questions`);
      }
    }
    sendLog(`Captured paper: ${capture.apiUrl || 'no api url'} | dom questions ${capture.domQuestions.length} | answer plan ${answerPlan.length}`);

    for (let ai = 0; ai < answerPlan.length; ai++) {
      const item = answerPlan[ai];
      const correctTexts = (item.correct || []).map(c => (c.text || c.id || '').slice(0, 40)).join(' | ');
      const multiTag = (item.correct?.length || 0) > 1 ? ' [多选]' : '';
      sendLog(`  Plan Q${ai + 1}: "${(item.text || '').slice(0, 60)}" -> [${correctTexts}]${multiTag}`);
    }

    if (!ALLOW_EXAM_SUBMIT) {
      await logPageState(page, 'diagnostic capture complete; skip submit');
      sendLog('Submit skipped: ALLOW_EXAM_SUBMIT is not enabled');
      processedTitles.add(exam.title);
      continue;
    }
    if (!answerPlan.length) {
      await logPageState(page, 'no answer plan available; skip submit');
      sendLog('Submit skipped: failed to extract answers from runtime payload');
      processedTitles.add(exam.title);
      continue;
    }

    const answerResult = await answerExamMultiPass(page, answerPlan);
    sendLog(`Multi-pass answer: apiMatched=${answerResult.totalApiMatched} fallback=${answerResult.totalFallback} clicked=${answerResult.totalClicked}`);
    await sleep(1500);
    const completion = await inspectAnswerCompletionByPlan(page, answerPlan);
    const pct = answerPlan.length ? Math.round(completion.answered / answerPlan.length * 100) : 0;
    sendLog(`Answer completion: questions=${completion.questions}, answered=${completion.answered}, unanswered=${completion.unanswered} -> ${pct}%`);

    // Diagnostic: read and log selected states per question
    const optionsFrame = await getOptionsFrame(page);
    const diagStates = await optionsFrame.evaluate(() => {
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
      sendLog(`[DIAG] Q${qi + 1}: sel=${selIdx} ${lis.map(li => `[${li.cls.slice(0, 20)}|${li.liAnswer}|${li.text.slice(0, 30)}]`).join(' ')}`);
    }

    if (completion.answered < answerPlan.length * 0.5) {
      await logPageState(page, `only ${pct}% answered; skip submit`);
      sendLog(`Submit skipped: only ${completion.answered}/${answerPlan.length} questions answered (${pct}%)`);
      continue;
    }
    if (pct < 100) {
      sendLog(`Submitting with ${completion.answered}/${answerPlan.length} answers (${pct}%) — some questions may be unanswered`);
    }

    await submitCurrentExam(page);
    await sleep(2000);
    processedTitles.add(exam.title);
  }
}

async function getFirstEnterableExam(page, skipTitles) {
  const rows = await page.locator('#joined tbody tr, table.table tbody tr').all();
  sendLog(`[DIAG] getFirstEnterableExam: found ${rows.length} table rows, skipped ${skipTitles.size} titles`);
  for (const row of rows) {
    if (!await row.isVisible().catch(() => false)) { sendLog(`  row not visible`); continue; }
    const info = await row.evaluate(el => {
      const text = node => (node?.textContent || '').replace(/\s+/g, ' ').trim();
      const cells = [...el.querySelectorAll('td')];
      const allCellTexts = cells.map(c => text(c));
      const titleEl = el.querySelector('.title[title], .ellipsis-2[title], .orderright .title');
      return { title: titleEl?.getAttribute('title') || text(titleEl) || text(cells[0]), status: text(cells[2]), statusAlt: text(cells[3]) || text(cells[1]), allCellTexts, hasEnterButton: !!el.querySelector('button[btn-name="toExam"]') };
    }).catch(() => null);
    if (!info) { sendLog(`  row evaluate failed`); continue; }
    sendLog(`  row: title="${(info.title||'').slice(0,40)}" status="${info.status}" statusAlt="${info.statusAlt}" hasEnterBtn=${info.hasEnterButton} skip=${skipTitles.has(info.title)} cells=[${(info.allCellTexts||[]).join('|')}]`);
    if (!info.hasEnterButton) { sendLog(`  -> skip: no enter button`); continue; }
    if (info.status && !/[待][考][试]|未通过|不及格|考试进行中/.test(info.status)) { sendLog(`  -> skip: status "${info.status}" not match`); continue; }
    if (skipTitles.has(info.title)) { sendLog(`  -> skip: already processed`); continue; }
    const visibleButtons = await row.locator('button[btn-name="toExam"]').all();
    const button = await firstVisibleLocator(visibleButtons);
    if (!button) { sendLog(`  -> skip: no visible button`); continue; }
    sendLog(`  => MATCH: returning exam "${info.title}"`);
    return { title: info.title || 'untitled exam', button };
  }
  sendLog(`[DIAG] getFirstEnterableExam: no enterable exam found`);
  return null;
}

async function enterFormalExam(page) {
  // Step 1: Check for confirmation-page "进入考试" button
  const goButton = page.locator('.btn-primary[du-click="goExam"], button[du-click="goExam"], button:has-text("进入考试"), a:has-text("进入考试"), span:has-text("进入考试")').first();
  if (await goButton.count().catch(() => 0) && await goButton.isVisible().catch(() => false)) {
    sendLog('点击"进入考试"确认按钮...');
    await goButton.click({ force: true });
    await page.waitForLoadState('domcontentloaded').catch(() => {});
    await sleep(3000);
  }
  // Step 2: Wait for exam page to load — check broader patterns
  for (let retry = 0; retry < 30; retry++) {
    const url = page.url();
    // URL-based detection
    if (/paperId=|examId=|testId=|paper_id=|exam_id=|myExamRecordId=|\/exam\/start|\/exam\/do/i.test(url)) {
      sendLog(`Exam page detected via URL: ${url.slice(0, 100)}`);
      return;
    }
    // Element-based detection
    const hasExamContent = await page.evaluate(() => {
      const visible = el => {
        if (!el) return false;
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return r.width > 0 && r.height > 0 && cs.display !== 'none' && cs.visibility !== 'hidden';
      };
      const optionEls = [...document.querySelectorAll('.questionDesc, .options, .option, input[type="radio"], input[type="checkbox"], ul.options, .exam-option, .paper-option, li[ng-repeat*="option"], [class*="question"], [class*="option"]')].filter(visible);
      const submitEls = [...document.querySelectorAll('#commit-answer, .btn-submit, span[du-click="onsubmit"], button[du-click*="submit"], button:has-text("提交"), button:has-text("交卷"), .submit-btn, [class*="submit"], [class*="commit"]')];
      const bodyText = (document.body?.innerText || '').slice(0, 500);
      const examKeywords = /试卷进度|答题卡|判断题|单选题|多选题|提交答案|提交试卷|交卷|剩余时间|考试时间/i;
      return {
        options: optionEls.length,
        hasSubmit: submitEls.length > 0,
        looksLikeExam: examKeywords.test(bodyText)
      };
    }).catch(() => ({ options: 0, hasSubmit: false, looksLikeExam: false }));

    if (hasExamContent.options >= 2 && hasExamContent.hasSubmit) {
      sendLog(`Exam page detected: ${hasExamContent.options} options, submit present`);
      return;
    }
    if (hasExamContent.looksLikeExam && (hasExamContent.options >= 2 || hasExamContent.hasSubmit)) {
      sendLog(`Exam page detected via body text + partial elements`);
      return;
    }
    await sleep(1000);
  }
  // Log diagnostic info on failure
  const diagUrl = page.url();
  const diagText = await page.evaluate(() => (document.body?.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 300)).catch(() => '');
  sendLog(`Enter exam timeout: url=${diagUrl.slice(0, 120)} body="${diagText.slice(0, 200)}"`, 'warn');
}

async function waitForExamReady(page) {
  for (let retry = 0; retry < 60; retry++) {
    const url = page.url();
    const hasPaperId = /paperId=|examId=|testId=|paper_id=|exam_id=|myExamRecordId=|\/exam\/start|\/exam\/do/i.test(url);
    // Must have BOTH paperId URL AND rendered option elements
    const state = await page.evaluate(() => {
      const visible = el => {
        if (!el) return false;
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return r.width > 0 && r.height > 0 && cs.display !== 'none' && cs.visibility !== 'hidden';
      };
      const ulOptions = [...document.querySelectorAll('ul.options')].filter(visible);
      const options = [...document.querySelectorAll('.questionDesc, .options, .option, input[type="radio"], input[type="checkbox"], ul.options, .exam-option, .paper-option, [class*="question"], [class*="option"]')].filter(visible);
      const submit = document.querySelector('#commit-answer, .btn-submit, span[du-click="onsubmit"], button[du-click*="submit"], button:has-text("提交"), button:has-text("交卷"), .submit-btn, [class*="submit"], [class*="commit"]');
      const bodyText = document.body?.innerText || '';
      const looksLikePaper = /试卷进度|答题卡|判断题|单选题|多选题|提交答案|提交试卷|交卷|剩余时间|考试时间/i.test(bodyText);
      return { ulOptionsCount: ulOptions.length, options: options.length, hasSubmit: !!submit, looksLikePaper };
    }).catch(() => ({ ulOptionsCount: 0, options: 0, hasSubmit: false, looksLikePaper: false }));
    if (hasPaperId && state.options >= 2 && (state.hasSubmit || state.looksLikePaper)) {
      sendLog(`Exam ready: options=${state.options} ulOptions=${state.ulOptionsCount} url=${url.slice(0, 80)}`);
      return true;
    }
    if (hasPaperId && retry > 5) {
      sendLog(`Exam waiting: retry=${retry} options=${state.options} ulOptions=${state.ulOptionsCount} hasSubmit=${state.hasSubmit} looksLikePaper=${state.looksLikePaper}`);
    }
    await sleep(1000);
  }
  // Diagnostic on failure
  try {
    const diagUrl = page.url();
    const diagText = await page.evaluate(() => (document.body?.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 400)).catch(() => '');
    sendLog(`Exam ready timeout: url=${diagUrl.slice(0, 100)} body="${diagText.slice(0, 200)}"`, 'warn');
  } catch {}
  return false;
}

async function waitForExamApiData(page) {
  const parsed = new URL(page.url());
  const myExamRecordId = parsed.searchParams.get('myExamRecordId');
  const paperId = parsed.searchParams.get('paperId');
  for (let retry = 0; retry < 90; retry++) {
    // Fast path: if URL has exam identifiers AND cache has data
    const hasExamUrl = /paperId=|myExamRecordId=|\/exam\/start|\/exam\/do/i.test(page.url());
    const found = examResponseCache.some(item =>
      item.json != null && item.answerPlanSize > 0 && (
        (paperId && item.paperId === paperId) ||
        (myExamRecordId && (item.myExamRecordId === myExamRecordId || (item.url || '').includes(myExamRecordId))) ||
        (/start-do-paper-or-test|paper-info|get-paper/i.test(item.url || '') && hasExamUrl)
      )
    );
    if (found) return true;
    await sleep(1000);
  }
  return false;
}

async function captureCurrentExam(page) {
  const EXAM_CAPTURE_DIR = path.join(process.cwd(), 'exam-captures');
  await fs.mkdir(EXAM_CAPTURE_DIR, { recursive: true });
  const currentUrl = page.url();
  const parsed = new URL(currentUrl);
  let paperId = parsed.searchParams.get('paperId');
  const myExamRecordId = parsed.searchParams.get('myExamRecordId');
  let apiUrl = '';
  let api = null;
  let apiError = null;

  // Try multiple API endpoints based on available URL params
  const apiEndpoints = [];
  if (paperId) {
    const ep = new URL('/train/cms/paper/start-do-paper-or-test.gson', parsed.origin);
    ep.searchParams.set('paperId', paperId);
    if (myExamRecordId) ep.searchParams.set('myExamRecordId', myExamRecordId);
    apiEndpoints.push(ep.toString());
  }
  if (myExamRecordId) {
    // Alternative endpoints for /exam/start exam type
    const ep2 = new URL('/train/cms/paper/start-do-paper-or-test.gson', parsed.origin);
    ep2.searchParams.set('myExamRecordId', myExamRecordId);
    apiEndpoints.push(ep2.toString());
    const ep3 = new URL('/train/cms/exam/paper-info.gson', parsed.origin);
    ep3.searchParams.set('myExamRecordId', myExamRecordId);
    apiEndpoints.push(ep3.toString());
    const ep4 = new URL('/train/cms/exam/start-exam.gson', parsed.origin);
    ep4.searchParams.set('myExamRecordId', myExamRecordId);
    apiEndpoints.push(ep4.toString());
    const ep5 = new URL('/train/cms/paper/get-paper.gson', parsed.origin);
    ep5.searchParams.set('myExamRecordId', myExamRecordId);
    apiEndpoints.push(ep5.toString());
  }

  for (const endpoint of apiEndpoints) {
    const response = await page.evaluate(async url => {
      const resp = await fetch(url, { credentials: 'include' });
      const body = await resp.text();
      return { status: resp.status, body };
    }, endpoint).catch(err => ({ status: 0, body: '', error: err.message }));

    if (response.error) continue;
    if (response.status < 200 || response.status >= 300) continue;
    try {
      const parsed = JSON.parse(response.body);
      // Verify it has answer data
      const test = JSON.stringify(parsed).slice(0, 2000);
      if (/(isRight|isCorrect|standardAnswer|correctAnswer|questionName|optionName)/.test(test)) {
        api = parsed;
        apiUrl = endpoint;
        sendLog(`API data fetched from: ${endpoint.slice(0, 80)}`);
        break;
      }
    } catch {}
  }
  if (!api && apiEndpoints.length && !paperId) {
    apiError = 'No answer-bearing API endpoint found for this exam URL type';
  }

  if (!api) {
    const cached = findCachedExamPayload({ paperId, myExamRecordId, pageUrl: currentUrl });
    if (cached?.json) { api = cached.json; apiUrl = cached.url; apiError = cached.note || null; paperId = paperId || cached.paperId || null; }
  }

  if (!api) {
    const runtime = await readExamRuntimePayload(page);
    if (runtime?.json) { api = runtime.json; apiUrl = runtime.url || apiUrl; apiError = runtime.note || null; paperId = paperId || runtime.paperId || null; }
  }

  if (!api && !apiError) { apiError = 'No answer-bearing exam payload found'; }

  const domQuestions = await readExamDomQuestions(page);
  const screenshotFile = `exam-${new Date().toISOString().replace(/[:.]/g, '-')}.png`;
  const screenshotPath = path.join(EXAM_CAPTURE_DIR, screenshotFile);
  await page.screenshot({ path: screenshotPath, fullPage: true }).catch(err => sendLog(`Screenshot failed: ${err.message}`));
  sendLog(`Screenshot saved: ${screenshotFile}`);

  return {
    capturedAt: new Date().toISOString(), pageUrl: currentUrl, apiUrl, paperId, myExamRecordId,
    apiError, api, domQuestions, screenshotFile
  };
}

async function readExamDomQuestions(page) {
  return page.evaluate(() => {
    const clean = value => String(value || '').replace(/\s+/g, ' ').trim();
    const allOpts = [...document.querySelectorAll('ul.options')];
    return allOpts.map((optionsUL, index) => {
      const questionLi = optionsUL.closest('li.mb20, li.sub');
      const questionText = questionLi
        ? clean(questionLi.querySelector('.questionDesc')?.textContent || '').slice(0, 500)
        : optionsUL.previousElementSibling?.matches?.('.questionDesc')
          ? clean(optionsUL.previousElementSibling.textContent).slice(0, 500) : '';
      const optionEls = [...optionsUL.querySelectorAll('li')].map(el => clean(el.textContent));
      return { index: index + 1, text: questionText, options: optionEls.filter(Boolean) };
    }).filter(item => item.text || item.options.length);
  }).catch(() => []);
}

async function saveExamCapture(capture) {
  const EXAM_CAPTURE_DIR = path.join(process.cwd(), 'exam-captures');
  await fs.mkdir(EXAM_CAPTURE_DIR, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const file = path.join(EXAM_CAPTURE_DIR, `exam-${stamp}.json`);
  await fs.writeFile(file, JSON.stringify(capture, null, 2), 'utf8');
  sendLog(`Exam capture saved: ${file}`);
}

async function inspectAnswerCompletionByPlan(page, answerPlan) {
  const optionsFrame = await getOptionsFrame(page);
  const count = await optionsFrame.locator('ul.options').count().catch(() => 0);
  let answered = 0, unanswered = 0;
  for (let idx = 0; idx < count; idx++) {
    const ul = optionsFrame.locator('ul.options').nth(idx);
    const liCount = await ul.locator('li').count().catch(() => 0);
    if (!liCount) { unanswered++; continue; }
    let anySelected = false;
    for (let liIdx = 0; liIdx < liCount; liIdx++) {
      const li = ul.locator('li').nth(liIdx);
      const liClass = await li.getAttribute('class').catch(() => '');
      const ariaChecked = await li.getAttribute('aria-checked').catch(() => '');
      const liAnswer = await li.getAttribute('li-is-answer').catch(() => '');
      if (/(active|selected|checked|choosed)/i.test(liClass) || ariaChecked === 'true' || liAnswer === 'true') { anySelected = true; break; }
    }
    if (anySelected) answered++; else unanswered++;
  }
  return { questions: count, answered, unanswered, planSize: answerPlan.length };
}

async function answerExamMultiPass(page, answerPlan) {
  let totalApiMatched = 0, totalFallback = 0, totalClicked = 0;
  for (let pass = 0; pass < 5; pass++) {
    const summary = await answerCurrentExam(page, answerPlan);
    totalApiMatched = summary.answered;
    totalFallback = summary.fallback;
    totalClicked += summary.clicked;
    const completion = await inspectAnswerCompletionByPlan(page, answerPlan);
    sendLog(`Pass ${pass + 1}: matched=${summary.answered} fallback=${summary.fallback} answered=${completion.answered} unanswered=${completion.unanswered}`);
    if (completion.answered >= answerPlan.length) break;
    if (!summary.questions && !summary.answered && !summary.fallback) break;
    await sleep(800);
  }
  return { totalApiMatched, totalFallback, totalClicked, answered: totalApiMatched };
}

async function getOptionsFrame(page) {
  // Check main frame first
  const mainCount = await page.locator('ul.options').count().catch(() => 0);
  if (mainCount > 0) return page;
  // Search sub-frames
  for (const frame of page.frames()) {
    if (frame === page.mainFrame()) continue;
    const count = await frame.locator('ul.options').count().catch(() => 0);
    if (count > 0) {
      sendLog(`Found options in sub-frame: ${frame.url().slice(0, 80)}`);
      return frame;
    }
  }
  // Diagnostic: log page structure
  sendLog(`[DIAG] getOptionsFrame: no ul.options found. Frames=${page.frames().length}`);
  const bodySample = await page.evaluate(() => {
    const body = (document.body?.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 300);
    const allOptionContainers = [...document.querySelectorAll('.options, .questionDesc, .exam-option, .paper-option, [class*="option"], [class*="question"]')].map(el => el.className || el.tagName).slice(0, 20);
    return { body: body.slice(0, 200), containers: allOptionContainers };
  }).catch(() => ({ body: 'evaluate failed', containers: [] }));
  sendLog(`[DIAG] body sample: "${bodySample.body}"`);
  sendLog(`[DIAG] option containers found: [${bodySample.containers.join(', ')}]`);
  return page; // fallback to main page
}

async function answerCurrentExam(page, answerPlan) {
  const clean = value => String(value || '').replace(/\s+/g, ' ').trim();
  const normalize = value => clean(value).replace(/^[A-Za-z0-9]+[\.、．)\s]+/, '').trim();

  // Find the frame that contains exam options (may be main page or sub-frame)
  const optionsFrame = await getOptionsFrame(page);
  const isSubFrame = optionsFrame !== page;

  // Step 1: scan DOM and match via page.evaluate in the correct frame — retry for slow render
  let groups = [];
  for (let retry = 0; retry < 10; retry++) {
    groups = await optionsFrame.evaluate(plan => {
      const clean = value => String(value || '').replace(/\s+/g, ' ').trim();
      const normalize = value => clean(value).replace(/^[A-Za-z0-9]+[\.、．)\s]+/, '').trim();
      const allOpts = [...document.querySelectorAll('ul.options')];
      const result = [];
      for (const opt of allOpts) {
        const lis = [...opt.querySelectorAll('li')];
        if (!lis.length) continue;
        const options = lis.map(li => ({ rawText: clean(li.textContent), text: normalize(li.textContent), value: li.getAttribute('li-value') || '' }));
        result.push({ options });
      }
      return result.map((group, idx) => {
        const planItem = plan[idx];
        if (!planItem) return { ...group, matchTexts: [], fallback: false };
        const planTexts = (planItem.correct || []).flatMap(item => [normalize(item.id), normalize(item.text)]).filter(Boolean);
        const wanted = new Set(planTexts);
        const matched = group.options.filter(opt =>
          wanted.has(opt.text) || wanted.has(opt.rawText) ||
          planTexts.some(w => w && (opt.text.includes(w) || opt.rawText.includes(w) || w.includes(opt.text)))
        );
        if (matched.length) return { ...group, matchTexts: matched.map(m => m.rawText.slice(0, 40)), fallback: false };
        return { ...group, matchTexts: [], fallback: true };
      });
    }, answerPlan);
    if (groups.length > 0) break;
    if (retry === 0) {
      sendLog(`[DIAG] answerCurrentExam retry ${retry}: 0 ul.options groups, waiting for render...`);
    }
    await sleep(1000);
  }

  sendLog(`Found ${groups.length} option groups${isSubFrame ? ' (in sub-frame)' : ''}`);
  let answered = 0, fallback = 0, clicked = 0;

  for (let idx = 0; idx < groups.length; idx++) {
    const group = groups[idx];
    if (!group.options.length) continue;
    const planItem = answerPlan[idx];
    const planTexts = planItem ? (planItem.correct || []).flatMap(item => [normalize(item.id), normalize(item.text)]).filter(Boolean) : [];
    const wantedSet = new Set(planTexts.filter(Boolean));
    const isMulti = (planItem?.correct?.length || 0) > 1;
    const typeTag = isMulti ? '[多选]' : (planItem ? '[单选/判断]' : '[无答案]');
    sendLog(`  Q${idx + 1} ${typeTag} plan=${planTexts.map(t => t.slice(0, 25)).join('|')} matched=${(group.matchTexts || []).join(', ')} fallback=${group.fallback}`);

    const ulLocator = optionsFrame.locator('ul.options').nth(idx);
    await ulLocator.scrollIntoViewIfNeeded().catch(() => {});
    await sleep(200);

    const liLocators = await ulLocator.locator('li').all();
    if (!liLocators.length) continue;

    let anyMatched = false;
    let anyClicked = false;
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
        // Use Playwright native click for all question types — dispatchEvent alone
        // does NOT trigger DUI/AngularJS handlers in CDP-connected BrowserView
        if (isMulti) {
          // Check hidden inputs first
          const hasInput = await li.evaluate(el => {
            const input = el.querySelector('input[type="checkbox"], input[type="radio"]');
            if (input) { input.checked = true; input.dispatchEvent(new Event('change', { bubbles: true })); input.dispatchEvent(new Event('input', { bubbles: true })); return true; }
            return false;
          });
          if (hasInput) sendLog(`    -> checked input in LI`);
          // Playwright native click
          await li.click({ timeout: 3000, force: true }).catch(() => {});
          // Angular scope toggle as backup
          await li.evaluate(el => {
            try {
              const scope = window.angular?.element(el)?.scope?.();
              if (scope?.$scope?.toggleSelect) scope.$scope.toggleSelect(scope.$scope.item);
            } catch {}
          });
          // Also try du-click parent chain
          await li.evaluate(el => {
            let parent = el.parentElement;
            while (parent) {
              const hasDuClick = parent.getAttribute('du-click');
              if (hasDuClick) { parent.click(); break; }
              parent = parent.parentElement;
            }
          });
        } else {
          // Single-choice: Playwright native click (NOT just dispatchEvent)
          await li.click({ timeout: 3000, force: true }).catch(() => {});
          // Also dispatch events for DUI compatibility
          await li.evaluate(el => {
            const r = el.getBoundingClientRect();
            for (const type of ['mouseover', 'mousedown', 'mouseup', 'click']) {
              el.dispatchEvent(new MouseEvent(type, { bubbles: true, cancelable: true, view: window, clientX: r.left + r.width / 2, clientY: r.top + r.height / 2 }));
            }
          });
        }
        clicked++; groupClicked++; anyClicked = true;
        sendLog(`    -> clicked LI: "${rawText.slice(0, 50)}"`);
        if (isMulti) await sleep(500);
      }
    }

    // For single-choice: if no match found, click first as fallback
    if (!anyMatched && !anyClicked && group.options.length && !isMulti) {
      const li = liLocators[0];
      await li.click({ timeout: 3000, force: true }).catch(() => {});
      await li.evaluate(el => {
        const r = el.getBoundingClientRect();
        for (const type of ['mouseover', 'mousedown', 'mouseup', 'click']) {
          el.dispatchEvent(new MouseEvent(type, { bubbles: true, cancelable: true, view: window, clientX: r.left + r.width / 2, clientY: r.top + r.height / 2 }));
        }
      });
      clicked++; groupClicked++; fallback++;
      sendLog(`    -> fallback click: "${group.options[0]?.rawText?.slice(0, 50)}"`);
    }

    if (anyMatched) answered++;
    else if (groupClicked) fallback++;

    // Post-click verification: check if LI state changed
    if (groupClicked > 0 && isMulti) {
      const verify = await ulLocator.locator('li').evaluateAll(lis =>
        lis.map(li => ({
          cls: li.className,
          liAnswer: li.getAttribute('li-is-answer') || '',
          aria: li.getAttribute('aria-checked') || ''
        }))
      ).catch(() => []);
      const anyChanged = verify.some(v => /active|selected|checked|choosed/i.test(v.cls) || v.liAnswer === 'true' || v.aria === 'true');
      sendLog(`    [VERIFY] Q${idx + 1} post-click: anySelected=${anyChanged} classes=${verify.map(v => v.cls).join('|')} liAnswer=${verify.map(v => v.liAnswer).join('|')}`);
    }
  }

  sendLog(`Answer result: groups=${groups.length}, matched=${answered}, fallback=${fallback}, totalClicks=${clicked}`);
  await sleep(500);
  return { questions: groups.length, answered, fallback, clicked };
}

async function submitCurrentExam(page) {
  // Try multiple submit button selectors
  const submit = page.locator('#commit-answer, .btn-submit, button:has-text("提交答案"), span:has-text("提交答案"), span[du-click*="submit"], button[du-click*="submit"], button:has-text("提交"), button:has-text("交卷"), .submit-btn, [class*="submit"]').first();
  if (!(await submit.count().catch(() => 0))) { sendLog('Submit button not found'); return; }
  sendLog('Submitting answers');
  // Use native click (not just dispatchEvent)
  await submit.click({ timeout: 5000, force: true }).catch(() => {});
  await submit.evaluate(el => {
    const r = el.getBoundingClientRect();
    for (const type of ['mouseover', 'mousedown', 'mouseup', 'click']) {
      el.dispatchEvent(new MouseEvent(type, { bubbles: true, cancelable: true, view: window, clientX: r.left + r.width / 2, clientY: r.top + r.height / 2 }));
    }
  });
  await sleep(1500);

  // Handle confirmation dialog
  const confirm = page.locator('.modal button:has-text("确定"), .modal button:has-text("确认"), button:has-text("确定"), button:has-text("确认"), .layui-layer-btn0, [class*="layer"]:has-text("确定"), .dialog-confirm:has-text("确定"), .dialog button:has-text("确"), .layui-layer-dialog .layui-layer-btn0').first();
  if (await confirm.count().catch(() => 0)) {
    sendLog('Confirm dialog found, clicking confirm');
    await confirm.click({ timeout: 3000, force: true }).catch(() => {});
  } else { sendLog('No confirm dialog detected'); }

  await page.waitForLoadState('domcontentloaded').catch(() => {});
  await sleep(2500);
}

// ── Network Trace Setup (call after page is available) ─────
async function attachExamNetworkTrace(page) {
  const EXAM_CAPTURE_DIR = path.join(process.cwd(), 'exam-captures');
  await fs.mkdir(EXAM_CAPTURE_DIR, { recursive: true });
  const interesting = /exam|paper|question|answer|submit|test|record|train|cms/i;

  page.on('request', async request => {
    const url = request.url();
    if (!interesting.test(url)) return;
  });

  page.on('response', async response => {
    const url = response.url();
    if (!interesting.test(url)) return;
    const contentType = response.headers()['content-type'] || '';
    const body = /json|javascript|text/i.test(contentType) ? await response.text().catch(() => '') : '';
    rememberExamResponse({ url, status: response.status(), contentType, body });
  });

  sendLog('Exam network trace enabled');
}

// ── Config & Entry ─────────────────────────────────────────
function configure(opts) {
  if (opts.baseUrl != null) BASE_URL = normalizeHttpBaseUrl(opts.baseUrl);
  if (opts.examsOnly != null) EXAMS_ONLY = opts.examsOnly;
  if (opts.allowExamSubmit != null) ALLOW_EXAM_SUBMIT = opts.allowExamSubmit;
  if (opts.traceProgress != null) TRACE_PROGRESS = opts.traceProgress;
  if (opts.proxyServer != null) PROXY_SERVER = normalizeProxyServer(opts.proxyServer);
  if (opts.chromiumExecutable != null) CHROMIUM_EXECUTABLE = opts.chromiumExecutable;
}

function stop() {
  stopRequested = true;
}

function getState() {
  return { stopRequested, phase, running };
}

async function runExamsOnly(page) {
  stopRequested = false;
  running = true;
  sendRunning(true);
  sendPhase('exams', '正在进入考试页面...');
  sendLog('===== 仅考试模式 =====', 'phase');
  await checkOnlineExams(page);
  if (!stopRequested) {
    sendPhase('done', '所有考试已完成');
    sendRunning(false);
  } else {
    sendPhase('idle', '已停止');
    sendRunning(false);
  }
}

function _setCallback(fn) { cb = fn; }
function _clearCallback() { cb = null; }

module.exports = {
  configure,
  runAutomation,
  runExamsOnly,
  stop,
  getState,
  attachExamNetworkTrace,
  _setCallback,
  _clearCallback,
  sleep
};
