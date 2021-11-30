const {Player} = require('.')
const {DriverBuilder} = require('../driver-utils')
const {expect} = require('chai')

describe('player specification', () => {
  let player, driver

  beforeEach(async () => {
    driver = await new DriverBuilder()
      .maximized()
      .noAutomation()
      .build()

    player = new Player(driver)
  })

  afterEach(() => driver.quit())

  describe('when user play clicks', () => {
    const clickEvent = {type: 'click', el: 'a'}
    const record = {
      startUrl: `file://${__dirname}/../test/pages/clicks/index.html`,
      record: [clickEvent, clickEvent],
    }

    beforeEach(() => player.play(record))

    it('should play simple clicks', async () => {
      let title = await driver.getTitle()
      expect(title).to.be.equal('Main Page')

      await driver.navigate().back()
      title = await driver.getTitle()
      expect(title).to.be.equal('Other Page')
    })
  })
})