// Sidebar injection module — runs inside the browser page via addInitScript
// Communicates with Node.js backend via console.log('[CMD] ...') and window.__yxUpdate()

export const SIDEBAR_INIT = `
(function() {
  function inject() {
  // Prevent duplicate injection
  if (document.getElementById('yx-sidebar-root')) return;
  if (!document.body) { setTimeout(inject, 10); return; }

  // Create sidebar container
  const sidebar = document.createElement('div');
  sidebar.id = 'yx-sidebar-root';
  sidebar.innerHTML = \`
<div id="yx-sidebar" style="
  position:fixed; top:0; left:0; width:300px; height:100vh;
  background:#1a1a2e; color:#e2e8f0; z-index:999999;
  display:flex; flex-direction:column;
  font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Microsoft YaHei',sans-serif;
  font-size:13px; overflow:hidden; user-select:none;
  border-right:1px solid #2d2d44;
">
  <!-- Header -->
  <div style="padding:16px; border-bottom:1px solid #2d2d44; display:flex; align-items:center; gap:8px;">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
    <span style="font-size:16px; font-weight:700; color:#f1f5f9;">云学助手</span>
    <span id="yx-badge" style="margin-left:auto; font-size:11px; padding:3px 10px; border-radius:10px; background:#334155; color:#94a3b8;">
      ● 就绪
    </span>
  </div>

  <!-- Stats -->
  <div style="padding:12px 16px; display:flex; flex-direction:column; gap:8px;">
    <div style="background:#232338; border-radius:8px; padding:10px 12px; display:flex; align-items:center; gap:10px;">
      <span style="font-size:20px;">📚</span>
      <div>
        <div style="font-size:11px; color:#94a3b8;">视频课程</div>
        <div style="font-size:18px; font-weight:700; color:#a78bfa;" id="yx-courses">--</div>
      </div>
    </div>
    <div style="background:#232338; border-radius:8px; padding:10px 12px; display:flex; align-items:center; gap:10px;">
      <span style="font-size:20px;">📝</span>
      <div>
        <div style="font-size:11px; color:#94a3b8;">待参加考试</div>
        <div style="font-size:18px; font-weight:700; color:#fbbf24;" id="yx-exams">--</div>
      </div>
    </div>
    <div style="background:#232338; border-radius:8px; padding:10px 12px; display:flex; align-items:center; gap:10px;">
      <span style="font-size:20px;">✅</span>
      <div>
        <div style="font-size:11px; color:#94a3b8;">已完成考试</div>
        <div style="font-size:18px; font-weight:700; color:#34d399;" id="yx-done">--</div>
      </div>
    </div>
  </div>

  <!-- Buttons -->
  <div style="padding:8px 16px; display:flex; gap:8px;">
    <button id="yx-btn-start" style="
      flex:1; padding:10px; border:none; border-radius:8px;
      font-size:14px; font-weight:600; cursor:pointer;
      background:#7c3aed; color:#fff; transition:opacity .2s;
    ">▶ 开始任务</button>
    <button id="yx-btn-stop" disabled style="
      flex:1; padding:10px; border:none; border-radius:8px;
      font-size:14px; font-weight:600; cursor:pointer;
      background:#ef4444; color:#fff; transition:opacity .2s;
      opacity:0.4;
    ">⏹ 停止</button>
  </div>

  <!-- Status -->
  <div id="yx-status" style="padding:0 16px 8px; font-size:11px; color:#94a3b8; min-height:18px;">
    就绪，点击"开始任务"启动
  </div>

  <!-- Log area -->
  <div style="flex:1; margin:0 8px 8px; overflow:hidden; display:flex; flex-direction:column;">
    <div style="font-size:10px; color:#64748b; padding:4px 8px;">运行日志</div>
    <div id="yx-log" style="
      flex:1; overflow-y:auto; background:#0f0f1a; border-radius:6px;
      padding:8px; font-family:'Cascadia Code','Fira Code',Consolas,monospace;
      font-size:11px; line-height:1.6;
    "></div>
  </div>
</div>\`;

  document.body.appendChild(sidebar);

  // Adjust page layout
  const style = document.createElement('style');
  style.textContent = 'html { margin-left: 300px !important; }';
  document.head.appendChild(style);

  // Command handlers
  document.getElementById('yx-btn-start').onclick = function() {
    console.log('[CMD] start');
  };
  document.getElementById('yx-btn-stop').onclick = function() {
    console.log('[CMD] stop');
  };

  // Global update function (called by Node.js via page.evaluate)
  window.__yxUpdate = function(data) {
    if (data.phase) {
      var badge = document.getElementById('yx-badge');
      var colors = { idle:'#334155', login:'#475569', learning:'#7c3aed', exams:'#f59e0b', done:'#10b981', stopping:'#ef4444' };
      var texts = { idle:'● 就绪', login:'● 等待登录', learning:'● 学习中', exams:'● 考试中', done:'✓ 完成', stopping:'● 停止中' };
      badge.style.background = colors[data.phase] || '#334155';
      badge.style.color = '#fff';
      badge.textContent = texts[data.phase] || data.phase;
    }
    if (data.running !== undefined) {
      document.getElementById('yx-btn-start').disabled = data.running;
      document.getElementById('yx-btn-stop').disabled = !data.running;
      document.getElementById('yx-btn-stop').style.opacity = data.running ? '1' : '0.4';
    }
    if (data.message) {
      document.getElementById('yx-status').textContent = data.message;
    }
    if (data.courses) {
      document.getElementById('yx-courses').textContent = data.courses;
    }
    if (data.exams) {
      document.getElementById('yx-exams').textContent = data.exams;
    }
    if (data.done) {
      document.getElementById('yx-done').textContent = data.done;
    }
    if (data.log) {
      var logEl = document.getElementById('yx-log');
      var div = document.createElement('div');
      div.innerHTML = '<span style="color:#64748b;">' + data.log.time + '</span> <span style="color:#cbd5e1;">' + data.log.text + '</span>';
      logEl.appendChild(div);
      logEl.scrollTop = logEl.scrollHeight;
      // Keep last 200 entries
      while (logEl.children.length > 200) logEl.removeChild(logEl.firstChild);
    }
    if (data.logs) {
      var logEl = document.getElementById('yx-log');
      logEl.innerHTML = '';
      (data.logs || []).forEach(function(l) {
        var div = document.createElement('div');
        var color = l.level === 'phase' ? '#60a5fa' : l.level === 'warn' ? '#fbbf24' : l.level === 'error' ? '#f87171' : '#cbd5e1';
        div.innerHTML = '<span style="color:#64748b;">' + l.time + '</span> <span style="color:' + color + ';">' + l.text + '</span>';
        logEl.appendChild(div);
      });
      logEl.scrollTop = logEl.scrollHeight;
    }
  };
  } // end inject()
  inject();
})();
`;

// Build sidebar update payload
export function sidebarUpdate(data) {
  return `if (window.__yxUpdate) window.__yxUpdate(${JSON.stringify(data)});`;
}
