const {ipcMain} = require('electron')

module.exports = ({settings}) => {
  ipcMain.handle('settings-recent', () => settings.recentItems())
  ipcMain.handle('settings-recent-add', (event, path) => settings.addRecent(path))

  ipcMain.handle('settings-configuration', () => settings.globalConfig())
  ipcMain.handle('settings-save-configuration', (event, config) => settings.updateGlobalConfig(config))
}
