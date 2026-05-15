// Desktop shell page: left embedded browser iframe + right control panel.
// The Playwright runner talks to this page through window.__readCmd / window.__update.

export const SHELL_INJECT_SCRIPT = `
(function() {
  var DEFAULT_URL = 'http://sddy.gxk.yxlearning.com/login';
  var injected = false;

  function sendCmd(action, value) {
    window.__yx_cmd = value == null ? action : { action: action, value: value };
  }

  window.__readCmd = function() {
    var c = window.__yx_cmd || null;
    window.__yx_cmd = null;
    return c;
  };

  function setText(id, value) {
    var el = document.getElementById(id);
    if (el != null && value != null) el.textContent = String(value);
  }

  function addLog(entry) {
    var logEl = document.getElementById('yx-log');
    if (!logEl || !entry) return;
    var row = document.createElement('div');
    var time = document.createElement('span');
    var text = document.createElement('span');
    time.style.color = '#8a99af';
    time.textContent = (entry.time || '') + ' ';
    text.style.color = entry.level === 'phase' ? '#1f64f2' : entry.level === 'warn' ? '#b7791f' : entry.level === 'error' ? '#dc2626' : '#53627b';
    text.textContent = entry.text || '';
    row.appendChild(time);
    row.appendChild(text);
    logEl.appendChild(row);
    while (logEl.children.length > 120) logEl.removeChild(logEl.firstChild);
    logEl.scrollTop = logEl.scrollHeight;
  }

  function formatRuntime(ms) {
    var total = Math.max(0, Math.floor(ms / 1000));
    var h = String(Math.floor(total / 3600)).padStart(2, '0');
    var m = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
    var s = String(total % 60).padStart(2, '0');
    return h + ':' + m + ':' + s;
  }

  function wrapSiteContent() {
    if (document.getElementById('yx-site-card')) return;
    var shell = document.getElementById('yx-helper-shell');
    var card = document.createElement('main');
    card.id = 'yx-site-card';
    card.innerHTML =
      '<div id="yx-browser-toolbar">' +
        '<div class="yx-nav-icons"><span>‹</span><span class="muted">›</span><span>↻</span></div>' +
        '<div id="yx-helper-address"><span style="color:#8795aa">🔒</span><input id="yx-address" value="' + DEFAULT_URL + '" spellcheck="false" autocomplete="off"></div>' +
        '<div class="yx-star">☆</div>' +
      '</div>' +
      '<section id="yx-site-viewport"></section>';
    document.body.insertBefore(card, shell);
    var viewport = document.getElementById('yx-site-viewport');
    Array.prototype.slice.call(document.body.childNodes).forEach(function(node) {
      if (node === shell || node === card) return;
      viewport.appendChild(node);
    });
  }

  function ensureUi() {
    if (injected || document.getElementById('yx-helper-shell')) return;
    injected = true;
    var style = document.createElement('style');
    style.id = 'yx-helper-style';
    style.textContent =
      'html.yx-helper-reserve,html.yx-helper-reserve body{width:100%!important;height:100%!important;margin:0!important;overflow:hidden!important;box-sizing:border-box!important;background:linear-gradient(135deg,rgba(222,238,255,.95),rgba(248,252,255,.98) 46%,rgba(232,244,255,.95))!important}' +
      '#yx-helper-shell{position:fixed;inset:0;z-index:2147483000;pointer-events:none;font-family:\"Microsoft YaHei\",\"Segoe UI\",sans-serif;color:#17233f}' +
      '#yx-helper-topbar{position:fixed;left:26px;right:26px;top:18px;height:44px;display:flex;align-items:center;justify-content:space-between;pointer-events:none}' +
      '#yx-helper-brand{display:flex;align-items:center;gap:12px;font-size:21px;font-weight:800;color:#0f2143}#yx-helper-logo{width:34px;height:34px;border-radius:10px;display:grid;place-items:center;color:#fff;background:linear-gradient(135deg,#1d7bf2,#52a8ff);box-shadow:0 10px 24px rgba(47,125,244,.28)}#yx-helper-ver{margin-left:8px;padding:5px 12px;border-radius:999px;background:#dfeafa;color:#31415c;font-size:13px;font-weight:700}' +
      '#yx-helper-window{display:flex;align-items:center;gap:20px;color:#1b2741;font-weight:700;font-size:17px}#yx-helper-window .setting{font-size:16px}' +
      '#yx-site-card{position:fixed!important;left:26px!important;top:82px!important;right:438px!important;bottom:58px!important;z-index:2147482998!important;display:grid!important;grid-template-rows:58px 1fr!important;border:1px solid #d9e7f7!important;border-radius:12px!important;background:rgba(255,255,255,.9)!important;box-shadow:0 18px 45px rgba(23,54,97,.12)!important;overflow:hidden!important;box-sizing:border-box!important}' +
      '#yx-browser-toolbar{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:14px;padding:12px 16px;background:rgba(255,255,255,.78);border-bottom:1px solid #d9e7f7;box-sizing:border-box}' +
      '.yx-nav-icons{display:flex;align-items:center;gap:16px;color:#24314a;font-size:32px;line-height:1}.yx-nav-icons .muted{color:#9aa8bb}.yx-star{color:#526079;font-size:28px;line-height:1}' +
      '#yx-site-viewport{min-height:0!important;overflow:auto!important;background:#fff!important;position:relative!important}' +
      '#yx-site-viewport>*{max-width:100%}' +
      '#yx-helper-address{height:36px;display:flex;align-items:center;gap:10px;padding:0 14px;border:1px solid #d4e0ef;border-radius:10px;background:rgba(255,255,255,.96);box-shadow:inset 0 1px 0 rgba(255,255,255,.85);pointer-events:auto}' +
      '#yx-helper-address input{width:100%;border:0;outline:0;background:transparent;color:#526079;font:15px \"Microsoft YaHei\",\"Segoe UI\",sans-serif}' +
      '#yx-helper-side{position:fixed;right:18px;top:82px;bottom:18px;width:398px;display:grid;grid-template-rows:auto auto 1fr;gap:14px;pointer-events:auto}' +
      '.yx-panel-card{background:rgba(255,255,255,.94);border:1px solid #d9e7f7;border-radius:12px;box-shadow:0 18px 45px rgba(23,54,97,.12);padding:18px;overflow:hidden}' +
      '.yx-title{display:flex;align-items:center;gap:9px;margin-bottom:18px;color:#16233d;font-size:16px;font-weight:800}' +
      '.yx-action{width:100%;min-height:76px;border:0;border-radius:9px;display:grid;grid-template-columns:54px 1fr;align-items:center;padding:0 20px;text-align:left;cursor:pointer;margin-top:12px}' +
      '.yx-action:first-of-type{margin-top:0}.yx-start{color:#fff;background:linear-gradient(135deg,#2684ff,#1f64f2)}.yx-stop{color:#df3131;background:linear-gradient(135deg,#fff2f2,#ffe5e5);border:1px solid #ffc6c6}.yx-action:disabled{opacity:.58;cursor:not-allowed}' +
      '.yx-round{width:42px;height:42px;border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,.24);font-size:16px;font-weight:900}.yx-stop .yx-round{background:linear-gradient(135deg,#ff6b6b,#e53935);color:#fff}' +
      '.yx-btn-title{display:block;font-size:18px;line-height:1.2;font-weight:800}.yx-btn-sub{display:block;margin-top:7px;font-size:13px;opacity:.82}' +
      '.yx-stats{display:grid;grid-template-columns:1fr 1fr;gap:12px}.yx-stat{min-height:74px;display:grid;grid-template-columns:48px 1fr;align-items:center;gap:11px;padding:12px;border:1px solid #dce8f5;border-radius:9px;background:linear-gradient(135deg,#f8fbff,#fff)}.yx-stat.exam{border-color:#f8dfb6;background:linear-gradient(135deg,#fffaf1,#fff)}.yx-stat.time{grid-column:1/-1;border-color:#ccefdc;background:linear-gradient(135deg,#f1fff7,#fff)}' +
      '.yx-icon{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;background:#eaf2ff;color:#2f7df4}.exam .yx-icon{background:#fff1d9;color:#f59e0b}.time .yx-icon{background:#dcf9e9;color:#18b46b}.yx-label{color:#25314a;font-size:13px;font-weight:800}.yx-value{margin-top:4px;font-size:25px;line-height:1;font-weight:900;color:#2f7df4}.exam .yx-value{color:#f59e0b}.time .yx-value{color:#18b46b}.yx-unit{margin-left:5px;color:#7c8ba2;font-size:12px;font-weight:700}' +
      '.yx-status{display:grid;gap:9px;color:#3b4963;font-size:13px}.yx-row{display:grid;grid-template-columns:12px 76px 1fr;align-items:center;gap:6px;min-width:0}.yx-dot{width:7px;height:7px;border-radius:50%;background:#18b46b}.yx-row-label{color:#65758f}.yx-row-value{min-width:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;font-weight:700}' +
      '#yx-log{height:116px;overflow:auto;margin-top:14px;padding:10px;border-radius:8px;border:1px solid #e1eaf5;background:#f7fbff;font-family:Consolas,\"Microsoft YaHei\",monospace;font-size:12px;line-height:1.6;color:#53627b}' +
      '#yx-helper-footer{position:fixed;left:26px;right:26px;bottom:14px;height:32px;display:flex;align-items:center;justify-content:space-between;color:#237447;font-size:13px;font-weight:700;pointer-events:none}.yx-footer-actions{display:flex;gap:32px;color:#1d6fe8}';
    document.head.appendChild(style);

    var root = document.createElement('div');
    root.id = 'yx-helper-shell';
    root.innerHTML =
      '<header id="yx-helper-topbar"><div id="yx-helper-brand"><span id="yx-helper-logo">▰</span><span>东营继续教育助手</span><span id="yx-helper-ver">v1.0.0</span></div><div id="yx-helper-window"><span class="setting">⚙ 设置</span><span>—</span><span>□</span><span>×</span></div></header>' +
      '<aside id="yx-helper-side">' +
        '<section class="yx-panel-card"><div class="yx-title">控制中心</div>' +
          '<button class="yx-action yx-start" id="yx-btn-start" type="button"><span class="yx-round">▶</span><span><span class="yx-btn-title">开始学习</span><span class="yx-btn-sub">自动学习课程，智能完成任务</span></span></button>' +
          '<button class="yx-action yx-stop" id="yx-btn-stop" type="button" disabled><span class="yx-round">■</span><span><span class="yx-btn-title">停止学习</span><span class="yx-btn-sub">停止所有学习任务</span></span></button>' +
        '</section>' +
        '<section class="yx-panel-card"><div class="yx-title">学习统计</div><div class="yx-stats">' +
          '<div class="yx-stat"><span class="yx-icon">课</span><span><span class="yx-label">正在学习</span><span class="yx-value" id="yx-courses">--</span></span></div>' +
          '<div class="yx-stat exam"><span class="yx-icon">考</span><span><span class="yx-label">待参加考试</span><span class="yx-value" id="yx-exams">--</span></span></div>' +
          '<div class="yx-stat time"><span class="yx-icon">时</span><span><span class="yx-label">累计学习时长</span><span class="yx-value" id="yx-hours">--</span><span class="yx-unit">学时</span></span></div>' +
        '</div></section>' +
        '<section class="yx-panel-card"><div class="yx-title">运行状态</div><div class="yx-status">' +
          '<div class="yx-row"><span class="yx-dot"></span><span class="yx-row-label">程序状态:</span><span class="yx-row-value" id="yx-phase">就绪</span></div>' +
          '<div class="yx-row"><span class="yx-dot"></span><span class="yx-row-label">当前任务:</span><span class="yx-row-value" id="yx-status">等待开始</span></div>' +
          '<div class="yx-row"><span class="yx-dot"></span><span class="yx-row-label">运行时长:</span><span class="yx-row-value" id="yx-runtime">00:00:00</span></div>' +
          '<div class="yx-row"><span class="yx-dot"></span><span class="yx-row-label">完成课程:</span><span class="yx-row-value" id="yx-course-done">--</span></div>' +
          '<div class="yx-row"><span class="yx-dot"></span><span class="yx-row-label">完成考试:</span><span class="yx-row-value" id="yx-done">--</span></div>' +
        '</div><div id="yx-log"></div></section>' +
      '</aside>' +
      '<footer id="yx-helper-footer"><div>● 浏览器内核运行正常</div><div class="yx-footer-actions"><span>？ 使用说明</span><span>↻ 检查更新</span></div></footer>';
    document.documentElement.classList.add('yx-helper-reserve');
    document.documentElement.appendChild(root);
    wrapSiteContent();

    var input = document.getElementById('yx-address');
    input.value = location.href && location.href !== 'about:blank' ? location.href : DEFAULT_URL;
    input.addEventListener('keydown', function(event) {
      if (event.key !== 'Enter') return;
      var url = input.value.trim() || DEFAULT_URL;
      if (!/^[a-z]+:\\/\\//i.test(url)) url = 'http://' + url;
      input.value = url;
      sendCmd('navigate', url);
      location.href = url;
    });
    document.getElementById('yx-btn-start').addEventListener('click', function() { sendCmd('start'); });
    document.getElementById('yx-btn-stop').addEventListener('click', function() { sendCmd('stop'); });
  }

  window.__yxEnsureUi = ensureUi;
  window.__update = function(data) {
    ensureUi();
    if (data.phase != null) {
      var phaseText = { idle: '就绪', login: '等待登录', learning: '运行中', exams: '考试处理中', done: '已完成', stopping: '停止中' };
      setText('yx-phase', phaseText[data.phase] || data.phase);
    }
    if (data.running != null) {
      window.__yx_running = !!data.running;
      if (window.__yx_running && !window.__yx_started_at) window.__yx_started_at = Date.now();
      if (!window.__yx_running) window.__yx_started_at = null;
      document.getElementById('yx-btn-start').disabled = window.__yx_running;
      document.getElementById('yx-btn-stop').disabled = !window.__yx_running;
      if (!window.__yx_running) setText('yx-runtime', '00:00:00');
    }
    if (data.message != null) setText('yx-status', data.message);
    if (data.courses != null) { setText('yx-courses', data.courses); setText('yx-course-done', data.courses); }
    if (data.exams != null) setText('yx-exams', data.exams);
    if (data.done != null) setText('yx-done', data.done);
    if (data.hours != null) setText('yx-hours', data.hours);
    if (data.iframeUrl != null) {
      var address = document.getElementById('yx-address');
      if (address) address.value = data.iframeUrl;
    }
    if (data.log) addLog(data.log);
    if (data.logs) {
      var logEl = document.getElementById('yx-log');
      if (logEl) logEl.textContent = '';
      (data.logs || []).forEach(addLog);
    }
  };
  setInterval(function() {
    if (window.__yx_running && window.__yx_started_at) setText('yx-runtime', formatRuntime(Date.now() - window.__yx_started_at));
  }, 1000);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ensureUi, { once: true });
  else ensureUi();
})();
`;

export const SHELL_HTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
:root {
  --bg: #eef6ff;
  --panel: rgba(255, 255, 255, 0.9);
  --panel-strong: #ffffff;
  --line: #d9e7f7;
  --text: #17233f;
  --muted: #6d7c95;
  --blue: #2f7df4;
  --blue-deep: #0f5fe1;
  --red: #ef4444;
  --green: #18b46b;
  --orange: #f59e0b;
  --shadow: 0 18px 45px rgba(23, 54, 97, 0.12);
}

* { box-sizing: border-box; }
html, body { width: 100%; height: 100%; margin: 0; overflow: hidden; }
body {
  font-family: "Microsoft YaHei", "PingFang SC", "Segoe UI", sans-serif;
  color: var(--text);
  background:
    linear-gradient(135deg, rgba(222, 238, 255, 0.95), rgba(248, 252, 255, 0.98) 46%, rgba(232, 244, 255, 0.95)),
    radial-gradient(circle at 20% 10%, rgba(47, 125, 244, 0.16), transparent 34%);
}

.app {
  height: 100vh;
  display: grid;
  grid-template-rows: 66px 1fr 42px;
  padding: 18px 22px 12px;
  gap: 14px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 0;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.brand-icon {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: linear-gradient(135deg, #1d7bf2, #52a8ff);
  box-shadow: 0 10px 24px rgba(47, 125, 244, 0.28);
}

.brand h1 {
  margin: 0;
  font-size: 21px;
  font-weight: 800;
  letter-spacing: 0;
}

.version {
  margin-left: 8px;
  padding: 5px 12px;
  border-radius: 999px;
  background: #dfeafa;
  color: #31415c;
  font-size: 13px;
  font-weight: 700;
}

.top-actions {
  display: flex;
  align-items: center;
  gap: 18px;
  color: #27344d;
  font-weight: 700;
}

.setting {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: default;
}

.chrome-controls {
  display: inline-flex;
  align-items: center;
  gap: 18px;
  color: #1b2741;
}

.main {
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(620px, 1fr) 398px;
  gap: 18px;
}

.browser-card,
.panel-card {
  background: var(--panel);
  border: 1px solid var(--line);
  box-shadow: var(--shadow);
  border-radius: 12px;
  overflow: hidden;
}

.browser-card {
  display: grid;
  grid-template-rows: 58px 1fr;
  min-width: 0;
}

.browser-toolbar {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.76);
  border-bottom: 1px solid var(--line);
}

.nav-icons,
.tool-icons {
  display: flex;
  align-items: center;
  gap: 16px;
  color: #24314a;
}

.address {
  min-width: 0;
  height: 36px;
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 0 13px;
  border: 1px solid #d4e0ef;
  border-radius: 9px;
  background: #fff;
  color: #526079;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.85);
}

#yx-address {
  width: 100%;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: #526079;
  font: inherit;
  font-size: 15px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.browser-frame {
  position: relative;
  min-height: 0;
  background: #fff;
}

#yx-frame {
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
  background: #fff;
}

.side {
  min-height: 0;
  display: grid;
  grid-template-rows: auto auto 1fr;
  gap: 14px;
}

.panel-card {
  padding: 18px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 18px;
  color: #16233d;
  font-size: 16px;
  font-weight: 800;
}

.action-stack {
  display: grid;
  gap: 12px;
}

.action-btn {
  width: 100%;
  min-height: 76px;
  border: 0;
  border-radius: 9px;
  display: grid;
  grid-template-columns: 54px 1fr;
  align-items: center;
  padding: 0 20px;
  text-align: left;
  cursor: pointer;
  transition: transform .16s ease, box-shadow .16s ease, opacity .16s ease;
}

.action-btn:hover { transform: translateY(-1px); }
.action-btn:disabled { cursor: not-allowed; opacity: .58; transform: none; }

.start {
  color: #fff;
  background: linear-gradient(135deg, #2684ff, #1f64f2);
  box-shadow: 0 14px 28px rgba(47, 125, 244, .24);
}

.stop {
  color: #df3131;
  background: linear-gradient(135deg, #fff2f2, #ffe5e5);
  border: 1px solid #ffc6c6;
}

.btn-title {
  display: block;
  font-size: 18px;
  line-height: 1.2;
  font-weight: 800;
}

.btn-sub {
  display: block;
  margin-top: 7px;
  font-size: 13px;
  opacity: .82;
}

.round-icon {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, .24);
}

.stop .round-icon { background: linear-gradient(135deg, #ff6b6b, #e53935); color: #fff; }

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.stat-card {
  min-height: 74px;
  display: grid;
  grid-template-columns: 48px 1fr;
  align-items: center;
  gap: 11px;
  padding: 12px;
  border: 1px solid #dce8f5;
  border-radius: 9px;
  background: linear-gradient(135deg, #f8fbff, #ffffff);
}

.stat-card.exam {
  border-color: #f8dfb6;
  background: linear-gradient(135deg, #fffaf1, #fff);
}

.stat-card.time {
  grid-column: 1 / -1;
  border-color: #ccefdc;
  background: linear-gradient(135deg, #f1fff7, #ffffff);
}

.stat-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: #eaf2ff;
  color: var(--blue);
}

.exam .stat-icon { background: #fff1d9; color: var(--orange); }
.time .stat-icon { background: #dcf9e9; color: var(--green); }

.stat-label {
  color: #25314a;
  font-size: 13px;
  font-weight: 800;
}

.stat-value {
  margin-top: 4px;
  font-size: 25px;
  line-height: 1;
  font-weight: 900;
  color: var(--blue);
}

.exam .stat-value { color: var(--orange); }
.time .stat-value { color: var(--green); }
.unit {
  margin-left: 5px;
  color: #7c8ba2;
  font-size: 12px;
  font-weight: 700;
}

.status-list {
  display: grid;
  gap: 9px;
  color: #3b4963;
  font-size: 13px;
}

.status-row {
  display: grid;
  grid-template-columns: 12px 76px 1fr;
  align-items: center;
  gap: 6px;
  min-width: 0;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--green);
}

.row-label { color: #65758f; }
.row-value {
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 700;
}

.log-area {
  height: 116px;
  overflow: auto;
  margin-top: 14px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #e1eaf5;
  background: #f7fbff;
  font-family: Consolas, "Microsoft YaHei", monospace;
  font-size: 12px;
  line-height: 1.6;
  color: #53627b;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #237447;
  font-size: 13px;
  font-weight: 700;
}

.footer-actions {
  display: flex;
  gap: 32px;
  color: #1d6fe8;
}

.link-action {
  display: inline-flex;
  align-items: center;
  gap: 7px;
}

svg { flex: 0 0 auto; }

@media (max-width: 1050px) {
  .app { padding: 12px; }
  .main { grid-template-columns: 1fr 330px; gap: 12px; }
  .panel-card { padding: 14px; }
}
</style>
</head>
<body>
<div class="app">
  <header class="topbar">
    <div class="brand">
      <div class="brand-icon">
        <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.3" stroke-linejoin="round">
          <path d="M12 3 2.8 8l9.2 5 9.2-5L12 3Z"/>
          <path d="M6.5 10.2v5.1c0 1.5 2.5 3.2 5.5 3.2s5.5-1.7 5.5-3.2v-5.1"/>
        </svg>
      </div>
      <h1>东营继续教育助手</h1>
      <span class="version">v1.0.0</span>
    </div>
    <div class="top-actions">
      <button class="setting" type="button" title="设置">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="M19.4 15a1.8 1.8 0 0 0 .36 1.98l.05.05a2.1 2.1 0 0 1-2.97 2.97l-.05-.05a1.8 1.8 0 0 0-1.98-.36 1.8 1.8 0 0 0-1.09 1.65V21a2.1 2.1 0 0 1-4.2 0v-.07a1.8 1.8 0 0 0-1.09-1.65 1.8 1.8 0 0 0-1.98.36l-.05.05a2.1 2.1 0 0 1-2.97-2.97l.05-.05A1.8 1.8 0 0 0 3.84 15a1.8 1.8 0 0 0-1.65-1.09H2.1a2.1 2.1 0 0 1 0-4.2h.07a1.8 1.8 0 0 0 1.65-1.09 1.8 1.8 0 0 0-.36-1.98l-.05-.05A2.1 2.1 0 0 1 6.38 3.6l.05.05a1.8 1.8 0 0 0 1.98.36A1.8 1.8 0 0 0 9.5 2.36V2.1a2.1 2.1 0 0 1 4.2 0v.07a1.8 1.8 0 0 0 1.09 1.65 1.8 1.8 0 0 0 1.98-.36l.05-.05a2.1 2.1 0 0 1 2.97 2.97l-.05.05a1.8 1.8 0 0 0-.36 1.98 1.8 1.8 0 0 0 1.65 1.09h.07a2.1 2.1 0 0 1 0 4.2h-.07A1.8 1.8 0 0 0 19.4 15Z"/></svg>
        设置
      </button>
      <div class="chrome-controls" aria-hidden="true">
        <span>—</span><span>□</span><span>×</span>
      </div>
    </div>
  </header>

  <main class="main">
    <section class="browser-card">
      <div class="browser-toolbar">
        <div class="nav-icons" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9aa8bb" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-2.64-6.36"/><path d="M21 3v6h-6"/></svg>
        </div>
        <div class="address">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#8795aa" stroke-width="2"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
          <input id="yx-address" value="http://sddy.gxk.yxlearning.com/login" spellcheck="false" autocomplete="off" />
        </div>
        <div class="tool-icons" aria-hidden="true">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#526079" stroke-width="2"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2Z"/></svg>
        </div>
      </div>
      <div class="browser-frame">
        <iframe id="yx-frame" src="http://sddy.gxk.yxlearning.com/login"></iframe>
      </div>
    </section>

    <aside class="side">
      <section class="panel-card">
        <div class="section-title">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2f7df4" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
          控制中心
        </div>
        <div class="action-stack">
          <button class="action-btn start" id="yx-btn-start" onclick="sendCmd('start')" type="button">
            <span class="round-icon">
              <svg width="23" height="23" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7L8 5Z"/></svg>
            </span>
            <span><span class="btn-title">开始学习</span><span class="btn-sub">自动学习课程，智能完成任务</span></span>
          </button>
          <button class="action-btn stop" id="yx-btn-stop" onclick="sendCmd('stop')" type="button" disabled>
            <span class="round-icon">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor"><rect x="7" y="7" width="10" height="10" rx="1.5"/></svg>
            </span>
            <span><span class="btn-title">停止学习</span><span class="btn-sub">停止所有学习任务</span></span>
          </button>
        </div>
      </section>

      <section class="panel-card">
        <div class="section-title">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2f7df4" stroke-width="2"><path d="M3 3v18h18"/><path d="M8 17V9"/><path d="M13 17V5"/><path d="M18 17v-6"/></svg>
          学习统计
        </div>
        <div class="stats-grid">
          <div class="stat-card">
            <span class="stat-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15Z"/></svg>
            </span>
            <span><span class="stat-label">正在学习</span><span class="stat-value" id="yx-courses">--</span></span>
          </div>
          <div class="stat-card exam">
            <span class="stat-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="m9 15 2 2 4-5"/></svg>
            </span>
            <span><span class="stat-label">待参加考试</span><span class="stat-value" id="yx-exams">--</span></span>
          </div>
          <div class="stat-card time">
            <span class="stat-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
            </span>
            <span><span class="stat-label">累计学习时长</span><span class="stat-value" id="yx-hours">--</span><span class="unit">学时</span></span>
          </div>
        </div>
      </section>

      <section class="panel-card">
        <div class="section-title">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2f7df4" stroke-width="2"><path d="M3 12h4l3 8 4-16 3 8h4"/></svg>
          运行状态
        </div>
        <div class="status-list">
          <div class="status-row"><span class="dot"></span><span class="row-label">程序状态:</span><span class="row-value" id="yx-phase">就绪</span></div>
          <div class="status-row"><span class="dot"></span><span class="row-label">当前任务:</span><span class="row-value" id="yx-status">等待开始</span></div>
          <div class="status-row"><span class="dot"></span><span class="row-label">运行时长:</span><span class="row-value" id="yx-runtime">00:00:00</span></div>
          <div class="status-row"><span class="dot"></span><span class="row-label">完成课程:</span><span class="row-value" id="yx-course-done">--</span></div>
          <div class="status-row"><span class="dot"></span><span class="row-label">完成考试:</span><span class="row-value" id="yx-done">--</span></div>
        </div>
        <div class="log-area" id="yx-log"></div>
      </section>
    </aside>
  </main>

  <footer class="footer">
    <div class="link-action">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#22c55e"><path d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3Z"/></svg>
      浏览器内核运行正常
    </div>
    <div class="footer-actions">
      <span class="link-action">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 1 1 5.8 1c-.6 1-1.7 1.4-2.2 2.3-.2.3-.2.7-.2 1.2"/><path d="M12 17h.01"/></svg>
        使用说明
      </span>
      <span class="link-action">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-2.64-6.36"/><path d="M21 3v6h-6"/></svg>
        检查更新
      </span>
    </div>
  </footer>
</div>

<script>
var __yx_cmd = null;
var __yx_default_url = 'http://sddy.gxk.yxlearning.com/login';
var __yx_started_at = null;
var __yx_running = false;

function sendCmd(action, value) {
  __yx_cmd = value == null ? action : { action: action, value: value };
}

window.__readCmd = function() {
  var c = __yx_cmd;
  __yx_cmd = null;
  return c;
};

window.addEventListener('DOMContentLoaded', function() {
  var input = document.getElementById('yx-address');
  var frame = document.getElementById('yx-frame');
  if (input && !input.value) input.value = __yx_default_url;
  if (frame && (!frame.getAttribute('src') || frame.getAttribute('src') === 'about:blank')) {
    frame.src = __yx_default_url;
  }
  if (input && frame) {
    input.addEventListener('keydown', function(event) {
      if (event.key !== 'Enter') return;
      var url = input.value.trim() || __yx_default_url;
      if (!/^[a-z]+:\/\//i.test(url)) url = 'http://' + url;
      input.value = url;
      frame.src = url;
      sendCmd('navigate', url);
    });
  }
});

function setText(id, value) {
  var el = document.getElementById(id);
  if (el != null && value != null) el.textContent = String(value);
}

function addLog(entry) {
  var logEl = document.getElementById('yx-log');
  if (!logEl || !entry) return;
  var row = document.createElement('div');
  var time = document.createElement('span');
  var text = document.createElement('span');
  time.style.color = '#8a99af';
  time.textContent = (entry.time || '') + ' ';
  text.style.color = entry.level === 'phase' ? '#1f64f2' : entry.level === 'warn' ? '#b7791f' : entry.level === 'error' ? '#dc2626' : '#53627b';
  text.textContent = entry.text || '';
  row.appendChild(time);
  row.appendChild(text);
  logEl.appendChild(row);
  while (logEl.children.length > 120) logEl.removeChild(logEl.firstChild);
  logEl.scrollTop = logEl.scrollHeight;
}

function formatRuntime(ms) {
  var total = Math.max(0, Math.floor(ms / 1000));
  var h = String(Math.floor(total / 3600)).padStart(2, '0');
  var m = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
  var s = String(total % 60).padStart(2, '0');
  return h + ':' + m + ':' + s;
}

setInterval(function() {
  if (__yx_running && __yx_started_at) {
    setText('yx-runtime', formatRuntime(Date.now() - __yx_started_at));
  }
}, 1000);

window.__update = function(data) {
  if (data.phase != null) {
    var phaseText = {
      idle: '就绪',
      login: '等待登录',
      learning: '运行中',
      exams: '考试处理中',
      done: '已完成',
      stopping: '停止中'
    };
    setText('yx-phase', phaseText[data.phase] || data.phase);
  }
  if (data.running != null) {
    __yx_running = !!data.running;
    if (__yx_running && !__yx_started_at) __yx_started_at = Date.now();
    if (!__yx_running) __yx_started_at = null;
    document.getElementById('yx-btn-start').disabled = __yx_running;
    document.getElementById('yx-btn-stop').disabled = !__yx_running;
    if (!__yx_running) setText('yx-runtime', '00:00:00');
  }
  if (data.message != null) setText('yx-status', data.message);
  if (data.courses != null) {
    setText('yx-courses', data.courses);
    setText('yx-course-done', data.courses);
  }
  if (data.exams != null) setText('yx-exams', data.exams);
  if (data.done != null) setText('yx-done', data.done);
  if (data.hours != null) setText('yx-hours', data.hours);
  if (data.iframeUrl != null) {
    document.getElementById('yx-frame').src = data.iframeUrl;
    var address = document.getElementById('yx-address');
    if (address) address.value = data.iframeUrl;
  }
  if (data.log) addLog(data.log);
  if (data.logs) {
    var logEl = document.getElementById('yx-log');
    if (logEl) logEl.textContent = '';
    (data.logs || []).forEach(addLog);
  }
};
</script>
</body>
</html>`;

export function shellUpdate(data) {
  return `if (window.__update) window.__update(${JSON.stringify(data)});`;
}

export function shellReadCmd() {
  return `if (window.__readCmd) window.__readCmd()`;
}
