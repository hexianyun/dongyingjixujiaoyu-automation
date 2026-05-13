document.addEventListener('DOMContentLoaded', function() {
  const startBtn = document.getElementById('startBtn');
  const stopBtn = document.getElementById('stopBtn');
  const statusDiv = document.getElementById('status');
  const progressContainer = document.getElementById('progress');
  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');
  const examCountEl = document.getElementById('examCount');
  const studyingCountEl = document.getElementById('studyingCount');

  // Check if automation is already running
  chrome.storage.local.get(['autoStep'], function(result) {
    if (result.autoStep && result.autoStep > 0 && result.autoStep < 10) {
      setRunningUI();
    }
  });

  // Query counts from content script (with storage fallback for cross-page caching)
  function refreshCounts() {
    // Read cached values from storage first (set by content script on any page)
    chrome.storage.local.get(['cachedExamCount', 'cachedStudyingCount'], function(cache) {
      studyingCountEl.textContent = cache.cachedStudyingCount !== undefined ? cache.cachedStudyingCount : '--';
      examCountEl.textContent = cache.cachedExamCount !== undefined ? cache.cachedExamCount : '--';
    });

    // Try live query from current tab (updates cache if on the right page)
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if (!tabs[0] || !tabs[0].url || !tabs[0].url.includes('sddy.gxk.yxlearning.com')) return;
      chrome.tabs.sendMessage(tabs[0].id, { type: 'getStudyingCount' }, function(resp) {
        if (!chrome.runtime.lastError && resp && resp.count >= 0) studyingCountEl.textContent = resp.count;
      });
      chrome.tabs.sendMessage(tabs[0].id, { type: 'getExamCount' }, function(resp) {
        if (!chrome.runtime.lastError && resp && resp.count >= 0) examCountEl.textContent = resp.count;
      });
    });
  }

  refreshCounts();

  // Listen for status from content script
  chrome.runtime.onMessage.addListener(function(message) {
    if (message.type === 'status') {
      updateStatus(message.text, message.status);
    } else if (message.type === 'progress') {
      updateProgress(message.value, message.text);
    }
  });

  function setRunningUI() {
    startBtn.disabled = true;
    startBtn.textContent = '运行中...';
    stopBtn.style.display = 'block';
    progressContainer.style.display = 'block';
  }

  function resetUI() {
    startBtn.disabled = false;
    startBtn.textContent = '开始自动学习';
    stopBtn.style.display = 'none';
    stopBtn.disabled = false;
    stopBtn.textContent = '停止';
  }

  function updateStatus(text, statusType) {
    statusDiv.textContent = text;
    statusDiv.className = 'status ' + statusType;
    if (statusType === 'success' || statusType === 'error') {
      resetUI();
    }
    // Refresh counts after course/exam status changes
    if (statusType === 'success' || statusType === 'error') {
      setTimeout(refreshCounts, 2000);
    }
  }

  function updateProgress(value, text) {
    progressContainer.style.display = 'block';
    progressFill.style.width = value + '%';
    progressText.textContent = text || value + '%';
  }

  startBtn.addEventListener('click', async function() {
    setRunningUI();
    updateStatus('正在启动...', 'running');
    updateProgress(0, '准备中...');

    await chrome.storage.local.remove(['autoStep']);

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      if (tab && tab.url && tab.url.includes('sddy.gxk.yxlearning.com')) {
        // Check if content script is alive
        chrome.tabs.sendMessage(tab.id, { type: 'ping' }, function(pong) {
          if (chrome.runtime.lastError) {
            updateStatus('插件未注入，请刷新页面后重试', 'error');
            resetUI();
            return;
          }
          chrome.tabs.sendMessage(tab.id, { type: 'start' });
        });
      } else {
        const newTab = await chrome.tabs.create({
          url: 'http://sddy.gxk.yxlearning.com/index'
        });

        chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
          if (tabId === newTab.id && info.status === 'complete') {
            chrome.tabs.onUpdated.removeListener(listener);
            setTimeout(() => {
              chrome.tabs.sendMessage(tabId, { type: 'start' }).catch(() => {});
            }, 3000);
          }
        });
      }
    } catch (error) {
      updateStatus('启动失败: ' + error.message, 'error');
      resetUI();
    }
  });

  stopBtn.addEventListener('click', async function() {
    stopBtn.disabled = true;
    stopBtn.textContent = '停止中...';
    updateStatus('正在停止...', 'running');

    try {
      const tabs = await chrome.tabs.query({ url: [
        'http://sddy.gxk.yxlearning.com/*',
        'https://sddy.gxk.yxlearning.com/*'
      ]});
      for (const tab of tabs) {
        chrome.tabs.sendMessage(tab.id, { type: 'stop' }).catch(() => {});
      }
    } catch (e) {}

    await chrome.storage.local.remove(['autoStep']);
    resetUI();
    updateStatus('已停止', 'error');
  });
});
