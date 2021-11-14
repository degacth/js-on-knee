const {ipcMain} = require('electron')

module.exports = ({settings}) => {
  ipcMain.handle('settings-recent', () => settings.recentItems())
}
