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
    watch() {

    }
  }
})