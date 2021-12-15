const require = window.require
const {ipcRenderer, clipboard} = require('electron')

module.exports = () => ({
  app: {
    quit() {
      ipcRenderer.send('app-quit')
    }
  },
  clipboard,
  record: {
    async start(url, config) {
      await ipcRenderer.invoke('record-start', url, config)
      return {}
    },
    stop() {
      ipcRenderer.send('record-stop')
    },
    async cancel() {
      await ipcRenderer.invoke('record-cancel')
    },
    save(filename) {
      return ipcRenderer.invoke('record-save', filename)
    },
    watch(handler) {
      ipcRenderer.once('record-stopped', handler)
    },
    open() {
      return ipcRenderer.invoke('record-open')
    },
    play(path) {
      return ipcRenderer.invoke('record-play', path)
    }
  },
  settings: {
    recent() {
      return ipcRenderer.invoke('settings-recent')
    },
    addRecent(path) {
      return ipcRenderer.invoke('settings-recent-add', path)
    },
    globalConfig() {
      return ipcRenderer.invoke('settings-configuration')
    },
    saveGlobalConfig(config) {
      return ipcRenderer.invoke('settings-save-configuration', config)
    }
  }
})