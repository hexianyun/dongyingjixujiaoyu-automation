const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('yxNative', {
  navigate: url => ipcRenderer.invoke('navigate', url),
  back: () => ipcRenderer.invoke('browser-back'),
  forward: () => ipcRenderer.invoke('browser-forward'),
  refresh: () => ipcRenderer.invoke('browser-refresh'),
  start: () => ipcRenderer.invoke('start-learning'),
  startExam: () => ipcRenderer.invoke('start-exam-only'),
  stop: () => ipcRenderer.invoke('stop-learning'),
  minimize: () => ipcRenderer.invoke('window-minimize'),
  maximize: () => ipcRenderer.invoke('window-maximize'),
  close: () => ipcRenderer.invoke('window-close'),

  // Event listeners for automation progress
  onUrl: callback => ipcRenderer.on('browser-url', (_event, url) => callback(url)),
  onStatus: callback => ipcRenderer.on('status-update', (_event, data) => callback(data)),
  onLog: callback => ipcRenderer.on('log-entry', (_event, data) => callback(data)),
  onCourses: callback => ipcRenderer.on('courses-update', (_event, data) => callback(data)),
  onExams: callback => ipcRenderer.on('exams-update', (_event, data) => callback(data)),
  onRuntimeTick: callback => ipcRenderer.on('runtime-tick', (_event, data) => callback(data))
});
