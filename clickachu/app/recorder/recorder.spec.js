require('chromedriver')

const {expect} = require('chai')
const {By, Builder} = require('selenium-webdriver')
const {Options} = require('selenium-webdriver/chrome')
const {Recorder} = require('.')
const fs = require('fs')

describe('recorder specification', () => {
  let recorder = null
  let driver = null

  beforeEach(async () => {
    recorder = new Recorder()
    await recorder.init()
    const pathToExtension = `${__dirname}/extension`
    const config = {address: recorder.address}
    fs.writeFileSync(`${pathToExtension}/config.js`, `const CLICKACHU_CONFIG = ${JSON.stringify(config)}`)

    const options = new Options()
    options.addArguments(`load-extension=${pathToExtension}`)

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build()
  })

  afterEach(async () => {
    await recorder?.close()
    await driver?.quit()
  })

  describe('when user clicks page', () => {
    beforeEach(async () => {
      await driver.get(`file://${__dirname}/../test/pages/clicks/index.html`)
      await driver.findElement(By.css('.main-page-link')).click()
      await driver.findElement(By.css('.other-page-link')).click()
    })

    it('should save all clicks', () => {
      expect(recorder.record).to.be.deep.equal([
        { type: 'click', el: '.main-page-link', },
        { type: 'click', el: '.other-page-link', },
      ])
    })
  })
})