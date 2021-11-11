const {expect} = require('chai');
const {MenuPage} = require('./pages/menu-page');
const {SpectronBuilder} = require('./spectron-builder');

SpectronBuilder.init()
  .withApp()
  .withLogging()
  .withSettings({
    recent: {
      items: [
        'D:\\hello\\world.json',
        '/foo/bar/baz.json'
      ]
    }
  })
  .run('main menu specification', ({app}) => {
    const menuPage = new MenuPage(app)

    describe.only('when user select recent files', () => {
      beforeEach(() => menuPage.openRecent())

      it('should show recent list', async () => {
        expect(await menuPage.recent()).to.be.deep.equal([
          'world.json',
          'baz.json',
        ])
      })
    })
  })
