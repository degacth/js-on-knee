const {ipcMain, app} = require('electron')
const {Recorder} = require('../recorder')
const {DriverBuilder, watchClosedByUser} = require('../driver-utils')

let activeRecord = null

module.exports = () => {
  ipcMain.handle('record-start', async (event, url) => {
    const recorder = new Recorder()
    await recorder.init()
    const config = {address: recorder.address}

    const driver = await new DriverBuilder().withRecordExtension(config).build()
    await driver.get(url)

    activeRecord = {driver}
    watchRecordStopped(event.sender, driver)
  })

  ipcMain.on('record-stop', event => {
    quitDriver()
    event.sender.send('record-stopped')
  })
}

const closedByUserWatchPeriod = 500
const watchRecordStopped = async (sender, driver) => {
  await watchClosedByUser(driver, closedByUserWatchPeriod)
  sender.send('record-stopped')
}

const quitDriver = () => activeRecord?.driver.quit()
app.on('before-quit', () => quitDriver())
