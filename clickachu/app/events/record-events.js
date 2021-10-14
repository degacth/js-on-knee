const {ipcMain} = require('electron')

module.exports = () => {
  ipcMain.handle('record-start', async (event, url) => {
    console.log('record-started', url)
  })
}
