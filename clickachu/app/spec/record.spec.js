const {expect} = require('chai')
const {Application} = require('spectron')
const {MenuPage} = require('./pages/menu-page')
const {NewRecordPage} = require('./pages/new-record-page')
const {ProgressRecordPage} = require('./pages/progress-record-page')
const electronPath = require('electron')

const app = new Application({
  path: electronPath,
  args: [
    __dirname + '/../app.js',
    '--on-top',
    '--preload-window',
    '--enable-remote',
  ]
})

describe('application record specification', () => {
  const menuPage = new MenuPage(app)
  const newRecordPage = new NewRecordPage(app)
  const progressRecordPage = new ProgressRecordPage(app)

  beforeEach(async () => {
    await app.start()
    await app.client.setTimeout({implicit: 4000})
    return app.browserWindow.show()
  })

  afterEach(async () => {
    const logs = (await app.client.getMainProcessLogs()) || []
    logs.forEach(item => console.log(item))
    return app.isRunning() && app.stop()
  })

  describe('when user start new record', () => {
    beforeEach(async () => {
      app.electron.clipboard.writeText(`file://${__dirname}/../test/pages/clicks/index.html`)
      await menuPage.newRecord()
      await newRecordPage.rec()
    })

    it('should start progress', async () => {
      expect(await progressRecordPage.isStarted()).to.be.true
    })

    describe('and stop record', () => {
      beforeEach(async () => await progressRecordPage.stop())

      it('should be stopped', async () => {
        expect(await progressRecordPage.isStopped()).to.be.true
      })
    })

    describe('and cancel record', () => {
      beforeEach(async () => {
        await progressRecordPage.stop()
        await progressRecordPage.cancel()
      })

      it.only('should show main menu', async () => {
        expect(await menuPage.isVisible()).to.be.true
      })
    })
  })
})
