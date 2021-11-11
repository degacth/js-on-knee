const {expect} = require('chai')
const {MenuPage} = require('./pages/menu-page')
const {NewRecordPage} = require('./pages/new-record-page')
const {ProgressRecordPage} = require('./pages/progress-record-page')
const {SpectronBuilder} = require('./spectron-builder')

SpectronBuilder.init()
  .withApp()
  .run('application record specification', ({app}) => {
    const menuPage = new MenuPage(app)
    const newRecordPage = new NewRecordPage(app)
    const progressRecordPage = new ProgressRecordPage(app)

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

        it('should show main menu', async () => {
          expect(await menuPage.isVisible()).to.be.true
        })
      })
    })
  })
