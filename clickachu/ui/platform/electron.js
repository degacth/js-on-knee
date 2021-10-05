const require = window.require
const {ipcRenderer} = require('electron')

module.exports = () => ({
  app: {
    quit() {
      ipcRenderer.send('app-quit')
    }
  }
})