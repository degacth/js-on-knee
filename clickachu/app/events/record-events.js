const {ipcMain, app, dialog} = require('electron')
const {Recorder} = require('../recorder')
const {DriverBuilder, watchClosedByUser} = require('../driver-utils')
const fs = require('fs/promises')

let activeRecord = null

module.exports = ({mb}) => {
  ipcMain.handle('record-start', async (event, url) => {
    const recorder = new Recorder()
    await recorder.init()
    const config = {address: recorder.address}

    const driver = await new DriverBuilder()
      .noAutomation()
      .maximized()
      .disableNotifications()
      .withRecordExtension(config).build()
    await driver.get(url)

    activeRecord = {driver, recorder, startUrl: url}
    watchRecordStopped(event.sender, driver)
  })

  ipcMain.on('record-stop', event => {
    quitDriver()
    event.sender.send('record-stopped')
  })

  ipcMain.handle('record-cancel', () => activeRecord = null)

  ipcMain.handle('record-save', async (event, filename) => {
    const defaultPath = `${app.getPath('documents')}/${filename}.json`
    const {filePath} = await dialog.showSaveDialog(event.sender.getOwnerBrowserWindow(), {
      defaultPath,
      filters: [
        { name: 'Json Files', extensions: ['json'] },
      ],
    })

    if (!filePath) return

    const recordData = {
      startUrl: activeRecord.startUrl,
      record: activeRecord.recorder.record,
    }

    await fs.writeFile(filePath, JSON.stringify(recordData, null, 2))
    activeRecord = null
    return filePath
  })
}

const closedByUserWatchPeriod = 500
const watchRecordStopped = async (sender, driver) => {
  await watchClosedByUser(driver, closedByUserWatchPeriod)
  activeRecord?.recorder.close()
  sender.send('record-stopped')
}

const quitDriver = () => {
  activeRecord?.driver.quit()
  activeRecord?.recorder.close()
}
app.on('before-quit', () => quitDriver())
