const {ipcMain} = require('electron')

module.exports = ({settings}) => {
  ipcMain.handle('settings-recent', () => settings.recentItems())
  ipcMain.handle('settings-recent-add', (event, path) => settings.addRecent(path))
}
