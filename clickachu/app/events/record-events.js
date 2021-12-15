const {ipcMain, app, dialog} = require('electron')
const {Recorder} = require('../recorder')
const {DriverBuilder, watchClosedByUser} = require('../driver-utils')
const fs = require('fs/promises')
const {FileStorage} = require('../settings')
const {Player} = require('../player')
const {dirname} = require('path')
const _ = require('lodash')

let activeRecord = null

module.exports = ({settings}) => {
  ipcMain.handle('record-start', async (event, url, userConfig) => {
    const recorder = new Recorder()
    await recorder.init()

    const excludeFalsyKeys = obj => _.keys(_.pickBy(obj, _.identity))
    _.updateWith(userConfig, 'recordEvents', excludeFalsyKeys)
    _.updateWith(userConfig, 'selectorTypes', excludeFalsyKeys)
    const config = {address: recorder.address, ... _.omit(userConfig, ['closeBrowserTimeout'])}

    const driver = await new DriverBuilder()
      .noAutomation()
      .maximized()
      .disableNotifications()
      .withRecordExtension(config)
      .build()

    await driver.get(url)
    activeRecord = {driver, recorder, startUrl: url}
    watchRecordStopped(event.sender, driver, Math.max(+userConfig.closeBrowserTimeout || 0, 300))
  })

  ipcMain.on('record-stop', event => {
    quitDriver()
    event.sender.send('record-stopped')
  })

  ipcMain.handle('record-cancel', () => activeRecord = null)

  ipcMain.handle('record-save', async (event, filename) => {
    const latestDirs = await settings.latestDirs()
    const defaultPath = `${latestDirs.opened}/${filename}.json`
    const {filePath} = await dialog.showSaveDialog(event.sender.getOwnerBrowserWindow(), {
      defaultPath,
      filters: dialogFilters,
    })

    if (!filePath) return

    const recordData = {
      startUrl: activeRecord.startUrl,
      record: activeRecord.recorder.record,
    }

    await fs.writeFile(filePath, JSON.stringify(recordData, null, 2))
    activeRecord = null

    await settings.updateLatestDirs({...latestDirs, opened: dirname(filePath)})
    await settings.addRecent(filePath)
    return filePath
  })

  ipcMain.handle('record-open', async (event) => {
    const window = event.sender.getOwnerBrowserWindow()
    const latestDirs = await settings.latestDirs()
    const defaultPath = latestDirs.played
    const {filePaths} = await dialog.showOpenDialog(window, {
      defaultPath,
      filters: dialogFilters,
      properties: ['openFile', 'showHiddenFiles',]
    })

    const path = filePaths && filePaths[0]
    if (path) await settings.updateLatestDirs({...latestDirs, played: dirname(path)})
    return path
  })

  ipcMain.handle('record-play', async (event, path) => {
    const recordData = await new FileStorage(path).read()

    const driver = await new DriverBuilder()
      .noAutomation()
      .disableNotifications()
      .setImplicitTimeout(10000)
      .maximized()
      .build()

    const player = new Player(driver)
    return player.play(recordData)
  })

  const dialogFilters = [
    { name: 'Json Files', extensions: ['json'] },
  ]
}

const watchRecordStopped = async (sender, driver, closedByUserWatchPeriod = 500) => {
  await watchClosedByUser(driver, closedByUserWatchPeriod)
  activeRecord?.recorder.close()
  sender.send('record-stopped')
}

const quitDriver = () => {
  activeRecord?.driver.quit()
  activeRecord?.recorder.close()
}
app.on('before-quit', () => quitDriver())
