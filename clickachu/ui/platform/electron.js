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
    async start(url) {
      await ipcRenderer.invoke('record-start', url)
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
    }
  },
  settings: {
    recent() {
    }
  }
})