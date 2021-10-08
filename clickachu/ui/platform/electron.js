const require = window.require
const {ipcRenderer, clipboard} = require('electron')

module.exports = () => ({
  app: {
    quit() {
      ipcRenderer.send('app-quit')
    }
  },
  clipboard,
})