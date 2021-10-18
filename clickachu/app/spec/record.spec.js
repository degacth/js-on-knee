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

describe.only('application record specification', () => {
  const menuPage = new MenuPage(app)
  const newRecordPage = new NewRecordPage(app)
  const progressRecordPage = new ProgressRecordPage(app)

  beforeEach(async () => {
    await app.start()
    return app.browserWindow.show()
  })

  afterEach(async () => app.stop())

  describe('when user start new record', () => {
    beforeEach(async () => {
      app.electron.clipboard.writeText(`file://${__dirname}/../test/pages/clicks/index.html`)
      await menuPage.newRecord()
      await newRecordPage.rec()
    })

    it('should start progress', async () => {
      expect(await progressRecordPage.isStarted()).to.be.true
    })
  })
})
