const {expect} = require('chai')
const {ConfigurationPage} = require('./pages/configuration-page')
const {MenuPage} = require('./pages/menu-page')
const {SpectronBuilder} = require('./spectron-builder')

SpectronBuilder.init()
  .withApp()
  .withLogging()
  .withSettings({
    configuration: {
      rootElementSelector: 'body',
      blacklistSelector: 'html',
    }
  })
  .run('configuration specification', ({app, storage}) => {
    const menuPage = new MenuPage(app)
    const configurationPage = new ConfigurationPage(app)

    beforeEach(() => menuPage.configuration())

    describe('when user configure settings', () => {
      it('should show record events and timeouts with defaults', async () => {
        const selectedEvents = await configurationPage.selectedEventTypeNames()
        expect(selectedEvents).to.be.deep.equal(['click', 'keydown'])

        const closeBrowserTimeout = await configurationPage.closeBrowserTimeout()
        expect(closeBrowserTimeout).to.be.equal(500)
      })

      describe('and configure selector settings', () => {
        beforeEach(() => configurationPage.openSelectorSettings())

        it('should show selector settings', async () => {
          const selectedSelectorTypes = await configurationPage.selectedSelectorTypes()
          expect(selectedSelectorTypes).to.be.deep.equal(['id', 'class', 'tag', 'nthchild'])

          const rootSelector = await configurationPage.rootSelector()
          expect(rootSelector).to.be.equal('body')

          const blacklist = await configurationPage.blacklistSelector()
          expect(blacklist).to.be.equal('html')
        })
      })
    })

    describe('when user change and save settings', () => {
      beforeEach(async () => {
        await configurationPage.updateCloseBrowserTimeout(2000)
        await configurationPage.saveSettings()
        await new Promise(res => setTimeout(res, 500))
      })

      it('should change values', async () =>
        expect(await storage().read()).to.nested.include({'configuration.closeBrowserTimeout': 2000})
      )
    })
  })
