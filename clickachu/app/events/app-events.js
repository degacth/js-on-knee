const {ipcMain, app} = require('electron')

module.exports = () => {
  ipcMain.on('app-quit', () => app.quit())
}
