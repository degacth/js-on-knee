const {ipcMain, app} = require('electron')
const {Recorder} = require('../recorder')
const {DriverBuilder} = require('../driver-utils')

let activeRecord = null

module.exports = () => {
  ipcMain.handle('record-start', async (event, url) => {
    const recorder = new Recorder()
    await recorder.init()
    const config = {address: recorder.address}

    const driver = await new DriverBuilder().withRecordExtension(config).build()
    await driver.get(url)

    activeRecord = {driver}
  })
}

app.on('before-quit', () => activeRecord?.driver.quit())
