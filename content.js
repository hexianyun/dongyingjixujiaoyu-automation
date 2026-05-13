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
let lastUIMutedVideoKey = null;

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
  el.dispatchEvent(new MouseEvent('mouseover', { bubbles: true, cancelable: true }));
  el.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true, cancelable: true }));
  el.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, cancelable: true }));
  el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
  el.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true }));
  el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  if (typeof el.onclick === 'function') el.onclick();
}

function hoverVideoPlayer() {
  const player = document.querySelector('.bplayer, .bplayer-wrap, .bplayer-box, .video-player, .prism-player, video') || document.querySelector('video')?.parentElement;
  if (!player) return false;
  player.dispatchEvent(new MouseEvent('mouseover', { bubbles: true, cancelable: true }));
  player.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true, cancelable: true }));
  player.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, cancelable: true, clientX: 20, clientY: 20 }));
  return true;
}

function isVisible(el) {
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) return false;
  let cur = el;
  for (let i = 0; i < 20 && cur; i++) {
    const cs = window.getComputedStyle(cur);
    if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') return false;
    cur = cur.parentElement;
  }
  return true;
}

function getMainVideo() {
  const videos = [...document.querySelectorAll('video')].filter(v => isFinite(v.duration) ? v.duration >= 60 : true);
  if (!videos.length) return document.querySelector('video');
  return videos.sort((a, b) => (b.duration || 0) - (a.duration || 0))[0];
}

function tryClickPlayButton() {
  hoverVideoPlayer();
  const play = document.getElementById('play');
  const stop = document.getElementById('stop');
  if (play && isVisible(play) && (!stop || !isVisible(stop))) {
    click(play);
    return true;
  }
  const pv = document.querySelector('.pv-playpause.pv-icon-btn-play');
  if (pv && isVisible(pv)) {
    click(pv);
    return true;
  }
  const bp = document.querySelector('.bplayer-playpause.bplayer-btn-play');
  if (bp && isVisible(bp)) {
    click(bp);
    return true;
  }
  return false;
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

// Find the first incomplete course (without clicking)
async function findFirstIncompleteCourse() {
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
    sendStatus('所有课程已完成', 'info');
    sendProgress(50, '课程完成');
    return null; // All done
  }

  const c = left[0];
  sendStatus(`进入课程: ${c.title}`, 'running');
  sendProgress(20, `${c.title} (${done + 1}/${total})`);

  const link = c.element.querySelector('a[du-click="courseck"]');
  if (!link) {
    sendStatus('未找到课程入口链接', 'error');
    return null;
  }
  return link;
}

// =====================================================
// Video Playback (inside a course page)
// =====================================================

async function muteVideo() {
  const v = getMainVideo() || document.querySelector('video');
  if (v) {
    v.muted = true;
    v.defaultMuted = true;
    v.volume = 0;
    try { v.setAttribute('muted', 'muted'); } catch (e) {}
  }

  const videoKey = v ? (v.currentSrc || v.src || 'video') : null;
  if (!videoKey) return !!v;

  const speaker = document.querySelector('#speaker');
  if (speaker && videoKey !== lastUIMutedVideoKey) {
    hoverVideoPlayer();
    const btn = speaker.closest('button') || speaker.closest('[role="button"]') || speaker.parentElement;
    if (btn && isVisible(btn)) {
      click(btn);
      await sleep(300);
      const currentVideo = getMainVideo() || document.querySelector('video');
      if (currentVideo) {
        currentVideo.muted = true;
        currentVideo.defaultMuted = true;
        currentVideo.volume = 0;
        try { currentVideo.setAttribute('muted', 'muted'); } catch (e) {}
      }
      lastUIMutedVideoKey = videoKey;
      sendStatus('已静音', 'running');
      return true;
    }
  }

  const muteBtn = document.querySelector('.volume-icon, .mute-btn, .player-mute, [class*="volume"], [class*="mute"]');
  if (muteBtn && videoKey !== lastUIMutedVideoKey && isVisible(muteBtn)) {
    hoverVideoPlayer();
    click(muteBtn);
    await sleep(300);
    const currentVideo = getMainVideo() || document.querySelector('video');
    if (currentVideo) {
      currentVideo.muted = true;
      currentVideo.defaultMuted = true;
      currentVideo.volume = 0;
      try { currentVideo.setAttribute('muted', 'muted'); } catch (e) {}
    }
    lastUIMutedVideoKey = videoKey;
    sendStatus('已静音', 'running');
    return true;
  }

  return !!v;
}

async function playVideos() {
  console.log('[Auto] playVideos: starting');
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
    sendStatus('所有视频已完成', 'info');
    return true;
  }

  sendStatus(`待播放 ${pending.length} 个视频`, 'running');
  for (let i = 0; i < pending.length; i++) {
    const pct = parseFloat(pending[i].querySelector('.badge')?.textContent || '0') || 0;
    sendProgress(30 + (i / pending.length) * 30, `视频 ${i + 1}/${pending.length} (${pct}%)`);
    sendStatus(`播放视频 ${i + 1}/${pending.length}`, 'running');
    click(pending[i]);
    await sleep(2000);
    await waitVideoEnd();
  }
  return true;
}

// Ensure video element exists and is actively playing (retry up to ~30s)
async function ensureVideoPlaying() {
  console.log('[Auto] ensureVideoPlaying: looking for video');
  let video = getMainVideo() || document.querySelector('video');
  for (let retry = 0; retry < 15; retry++) {
    const popup = document.querySelector('.bplayer-question-wrap');
    const popupVisible = !!(popup && window.getComputedStyle(popup).display !== 'none');
    hoverVideoPlayer();
    console.log(`[Auto] ensureVideoPlaying retry=${retry} video=${!!video} readyState=${video?.readyState ?? 'n/a'} paused=${video?.paused ?? 'n/a'} popupVisible=${popupVisible}`);

    if (video) {
      await muteVideo();
      if (video.readyState >= 2 && !video.ended) {
        await video.play().catch(err => console.log('[Auto] early video.play failed:', err?.message || err));
      }
    }

    if (popupVisible) {
      console.log('[Auto] ensureVideoPlaying: popup visible before video ready');
      return false;
    }
    if (video && video.readyState >= 2) break;
    await sleep(1000);
    video = getMainVideo() || document.querySelector('video');
  }
  if (!video) {
    console.log('[Auto] ensureVideoPlaying: video not found after retries');
    sendStatus('未找到视频元素', 'warning');
    return false;
  }

  await muteVideo();

  let lastCheck = video.currentTime;
  for (let retry = 0; retry < 10; retry++) {
    if (video.ended) { video.load(); await sleep(1000); }
    if (!video.paused && video.currentTime > 0 && video.currentTime !== lastCheck) {
      console.log(`[Auto] ensureVideoPlaying: playing confirmed retry=${retry} currentTime=${video.currentTime}`);
      break;
    }
    await muteVideo();
    console.log(`[Auto] ensureVideoPlaying play retry=${retry} paused=${video.paused} currentTime=${video.currentTime}`);
    await video.play().catch(err => console.log('[Auto] video.play failed:', err?.message || err));
    if ((video.paused || video.currentTime === lastCheck) && tryClickPlayButton()) {
      await sleep(300);
      await video.play().catch(() => {});
    }
    lastCheck = video.currentTime;
    await sleep(1000);
    video = getMainVideo() || document.querySelector('video') || video;
  }
  return true;
}

async function waitVideoEnd() {
  console.log('[Auto] waitVideoEnd: starting');
  let lastTime = 0, stall = 0, qAttempt = 0, muteCheck = 0;

  let ok = await ensureVideoPlaying();
  // If no video element is ready yet, keep polling both popup and video.
  // This avoids blocking popup handling behind player initialization.
  if (!ok) {
    for (let r = 0; r < 10; r++) {
      await sleep(2000);
      const popupHandled = await handlePopupQuestion(qAttempt);
      if (popupHandled) {
        qAttempt++;
        console.log(`[Auto] waitVideoEnd: handled popup during video wait retry=${r}`);
        await muteVideo();
      }
      const popup = document.querySelector('.bplayer-question-wrap');
      const popupVisible = !!(popup && window.getComputedStyle(popup).display !== 'none');
      const v = getMainVideo() || document.querySelector('video');
      const playBtn = document.querySelector('#play');
      console.log(`[Auto] waitVideoEnd preloop retry=${r} video=${!!v} readyState=${v?.readyState ?? 'n/a'} playBtn=${!!playBtn} popupVisible=${popupVisible}`);
      if (v && v.readyState > 0) {
        ok = true;
        break;
      }
    }
    if (!ok) {
      sendStatus('未检测到视频播放器', 'warning');
      console.log('[Auto] waitVideoEnd: no video element found, giving up');
      return;
    }
  }

  while (true) {
    await sleep(3000);
    const popupHandled = await handlePopupQuestion(qAttempt);
    if (popupHandled) {
      qAttempt++;
      await muteVideo();
      continue;
    }
    // Re-mute periodically (popup question may unmute video)
    if (++muteCheck % 2 === 0) await muteVideo();

    const active = document.querySelector('li.videoLi.active');
    if (active) {
      if ((parseFloat(active.querySelector('.badge')?.textContent) || 0) >= 100) return;
      if (active.querySelector('.progress-bar.finish')) return;
    }

    // Detect and recover from "当前视频源播放失败"
    const errEl = [...document.querySelectorAll('p, div, span')].find(el => el.textContent.includes('视频源播放失败'));
    if (errEl) {
      sendStatus('视频播放失败，尝试恢复...', 'running');
      await sleep(3000);
      const video = getMainVideo() || document.querySelector('video');
      if (video) { video.muted = true; video.load(); video.play().catch(() => {}); }
      lastTime = 0; stall = 0;
      continue;
    }

    // Check for popup again before deciding to exit (video might have ended
    // while popup was showing, and a new popup could be for the next step).
    // IMPORTANT: check element exists first — null?.style.display gives undefined,
    // and undefined !== 'none' is always true, causing infinite loop.
    const curPopup = document.querySelector('.bplayer-question-wrap');
    if (curPopup && window.getComputedStyle(curPopup).display !== 'none') continue;

    const video = getMainVideo() || document.querySelector('video');
    if (video) {
      if (video.ended) return;
      if (video.paused) { video.muted = true; video.play().catch(() => {}); }
      if (video.currentTime === lastTime && video.currentTime > 0) {
        stall++;
        if (stall >= 4) { video.muted = true; video.play().catch(() => {}); stall = 0; }
      } else { stall = 0; lastTime = video.currentTime; }
    }
  }
}

async function handlePopupQuestion(attempt) {
  try {
    const popup = document.querySelector('.bplayer-question-wrap');
    if (!popup || window.getComputedStyle(popup).display === 'none') return false;

    sendStatus('答题弹窗...', 'running');
    await sleep(2000);

    const allOpts = [...popup.querySelectorAll('.options .option-item')];
    const opts = allOpts.filter(o => {
      const c = o.querySelector('.option-item-content');
      return c && c.textContent && c.textContent.trim().length > 0;
    });
    if (!opts.length) return false;

    const titleEl = popup.querySelector('.title');
    const titleText = titleEl ? titleEl.textContent : '';
    const isMulti = titleText.includes('多选题');
    console.log(`[Auto] Popup type: ${isMulti ? '多选题' : '单选题/判断题'}, ${opts.length} options, attempt ${attempt}`);

    function isSelected(o) {
      return o.classList.contains('active') || o.classList.contains('selected') || o.classList.contains('checked') || o.getAttribute('aria-checked') === 'true';
    }

    function isVisible(el) {
      return !!el && window.getComputedStyle(el).display !== 'none' && window.getComputedStyle(el).visibility !== 'hidden';
    }

    function clearSelectedOptions() {
      opts.forEach(o => {
        if (isSelected(o)) click(o);
      });
    }

    async function ensureOptionSelected(o, wantSelected) {
      for (let j = 0; j < 3; j++) {
        if (isSelected(o) === wantSelected) return true;
        click(o);
        await sleep(120);
      }
      return isSelected(o) === wantSelected;
    }

    async function selectOption(o) {
      const ok = await ensureOptionSelected(o, true);
      if (!ok) console.log('[Auto] option select may have failed');
      return ok;
    }

    async function clearSelectionsReliably() {
      clearSelectedOptions();
      await sleep(200);
      for (const o of opts) {
        const selected = o.classList.contains('active') || o.classList.contains('selected') || o.classList.contains('checked') || o.getAttribute('aria-checked') === 'true';
        if (selected) {
          const ok = await ensureOptionSelected(o, false);
          if (!ok) console.log('[Auto] option clear may have failed');
        }
      }
    }

    await clearSelectionsReliably();
    await sleep(200);

    if (isMulti) {
      const count = Math.min((attempt % opts.length) + 1, opts.length);
      for (const o of opts.slice(0, count)) {
        const ok = await selectOption(o);
        console.log(`[Auto] Multi option selected=${ok} text=${o.querySelector('.option-item-content')?.textContent.trim()}`);
      }
      console.log(`[Auto] Multi select count=${count}`);
    } else {
      const idx = attempt % opts.length;
      const ok = await selectOption(opts[idx]);
      console.log(`[Auto] Single select idx=${idx} selected=${ok}`);
    }

    await sleep(500);
    const commit = popup.querySelector('.commit.bplayer-btn');
    if (!commit) {
      console.log('[Auto] No commit button found');
      return false;
    }
    click(commit);

    let resultVisible = false;
    for (let i = 0; i < 10; i++) {
      await sleep(500);
      const resultWrap = popup.querySelector('.result');
      const completeBtn = popup.querySelector('.complete.bplayer-btn');
      const correctEl = popup.querySelector('.answer-image.correct');
      const wrongTime = popup.querySelector('.wrong-time');
      const correctVisible = isVisible(correctEl);
      const completeVisible = isVisible(completeBtn);
      const wrongVisible = !!(wrongTime && wrongTime.textContent.trim());
      if (correctVisible || completeVisible || wrongVisible) {
        resultVisible = true;
        console.log(`[Auto] Result visible: correct=${correctVisible}, complete=${completeVisible}, wrong=${wrongVisible}, resultWrap=${isVisible(resultWrap)}`);
        if (correctVisible) {
          sendStatus('回答正确', 'info');
          if (completeBtn) {
            click(completeBtn);
            await sleep(1000);
          }
          return true;
        }
        break;
      }
    }

    sendStatus(resultVisible ? '回答错误，等待重试...' : '提交后未检测到结果，等待重试...', 'running');
    const done = popup.querySelector('.complete.bplayer-btn');
    if (done && isVisible(done)) click(done);
    await sleep(15000);
    return true;
  } catch (err) {
    console.error('[Auto] handlePopupQuestion error:', err);
    return false;
  }
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
    sendStatus('提交完成', 'info');
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
      const link = await findFirstIncompleteCourse();
      if (link) {
        // Save next state BEFORE clicking — page navigates immediately after click
        await saveStep(STEP.INSIDE_COURSE);
        click(link);
        // Course link uses AngularJS SPA (href="javascript:void(0)"),
        // so page may NOT reload. Wait for course content to appear.
        try {
          await waitForEl('li.videoLi', 15000);
          // SPA navigation succeeded — play videos directly
          sendStatus('进入课程页面，开始播放视频...', 'running');
          sendProgress(25, '视频播放中');
          await playVideos();
          sendProgress(60, '视频播放完成');
          await saveStep(STEP.PROCESS_COURSES);
          await goBackToLearningCenter();
        } catch (e) {
          // Full reload or timeout — init() handles via storage
        }
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
  // Cache course/exam counts (retry after delay for AngularJS rendering)
  async function cacheCounts() {
    // Try Angular selector first, then text fallback
    let studyEl = document.querySelector('span[du-html="studyingNum"]');
    if (studyEl) await chrome.storage.local.set({ cachedStudyingCount: parseInt(studyEl.textContent) || 0 });
    else {
      const m = document.body.textContent.match(/正在学习[（(]\s*(\d+)\s*[）)]/);
      if (m) await chrome.storage.local.set({ cachedStudyingCount: parseInt(m[1]) });
    }
    let examEl = document.querySelector('span[du-html="waitExamNum"]');
    if (examEl) await chrome.storage.local.set({ cachedExamCount: parseInt(examEl.textContent) || 0 });
    else {
      const m = document.body.textContent.match(/待参加考试[（(]\s*(\d+)\s*[）)]/);
      if (m) await chrome.storage.local.set({ cachedExamCount: parseInt(m[1]) });
    }
  }
  await cacheCounts();
  setTimeout(cacheCounts, 3000); // Retry after AngularJS renders

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

  if (msg.type === 'getExamCount') {
    let count = -1;
    const el = document.querySelector('span[du-html="waitExamNum"]');
    if (el) { count = parseInt(el.textContent) || 0; }
    else {
      // Fallback: extract number from "待参加考试（N）" text
      const m = document.body.textContent.match(/待参加考试[（(]\s*(\d+)\s*[）)]/);
      if (m) count = parseInt(m[1]);
    }
    if (count >= 0) chrome.storage.local.set({ cachedExamCount: count });
    sendResponse({ count });
    return;
  }

  if (msg.type === 'getStudyingCount') {
    let count = -1;
    const el = document.querySelector('span[du-html="studyingNum"]');
    if (el) { count = parseInt(el.textContent) || 0; }
    else {
      // Fallback: extract number from "正在学习（N）" text
      const m = document.body.textContent.match(/正在学习[（(]\s*(\d+)\s*[）)]/);
      if (m) count = parseInt(m[1]);
    }
    if (count >= 0) chrome.storage.local.set({ cachedStudyingCount: count });
    sendResponse({ count });
    return;
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
