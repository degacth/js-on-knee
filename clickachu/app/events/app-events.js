const {ipcMain} = require('electron')

module.exports = () => {
  ipcMain.on('app-quit', () => console.log('quit'))
}
