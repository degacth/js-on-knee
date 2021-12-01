require('chromedriver')

const {expect} = require('chai')
const {By, Key} = require('selenium-webdriver')
const {Recorder} = require('.')
const {DriverBuilder} = require('../driver-utils')
const {keydown, click} = require('../test/event-generator')
const _ = require('lodash')

describe('recorder specification', () => {
  let recorder = null
  let driver = null

  beforeEach(async () => {
    recorder = new Recorder()
    await recorder.init()
    const config = {address: recorder.address}
    driver = await new DriverBuilder().withRecordExtension(config).build()
  })

  afterEach(async () => {
    await recorder?.close()
    await driver?.quit()
    driver = null
  })

  describe('when user clicks page', () => {
    beforeEach(async () => {
      await driver.get(`file://${__dirname}/../test/pages/clicks/index.html`)
      await driver.findElement(By.css('.main-page-link')).click()
      await driver.findElement(By.css('.other-page-link')).click()
    })

    it('should save all clicks', () => {
      expect(recorder.record).to.be.deep.equal([
        click('.main-page-link'),
        click('.other-page-link'),
      ])
    })
  })

  describe('when user clicks select element', () => {
    beforeEach(async () => {
      await driver.get(`file://${__dirname}/../test/pages/clicks/selects.html`)

      await driver.findElement(By.css('#a .n-3')).click()
      await driver.findElement(By.css('#mult')).click()
      await driver.findElement(By.css('#b .n-4')).click()

      await driver.findElement(By.css('[type=submit]')).click()
    })

    it('should save all events and result', async () => {
      const result = await driver.findElement(By.css('#result'))
      expect(await result.getText()).to.be.equal('12')
      expect(recorder.record).to.be.deep.equal([
        click('#a .n-3'),
        click('#mult'),
        click('#b .n-4'),
        click('input'),
      ])
    })
  })

  describe('when user send keys', () => {
    const username = 'user@mylo.dom'
    const password = 'h3Ll%?'

    beforeEach(async () => {
      await driver.get(`file://${__dirname}/../test/pages/keyinput/login-page.html`)

      const elementWithKeys = {
        '[name=login]': [username, Key.TAB],
        '[name=password]': [password, Key.TAB],
        '[name=rememberme]': [Key.SPACE, Key.TAB],
        'button': [Key.ENTER],
      }

      for (const selector of Object.keys(elementWithKeys)) {
        const el = await driver.findElement(By.css(selector))
        for (const keys of elementWithKeys[selector]) {
          await el.sendKeys(keys)
        }
      }
    })

    it('should save all keys', () => {
      expect(recorder.record).to.deep.equal([
        ... _.map([...username.split(''), 'Tab'], char => keydown("[type='email']", char)),
        ... _.map([...password.split(''), 'Tab'], char => keydown("[type='password']", char)),

        keydown("[type='checkbox']", ' '),
        keydown("[type='checkbox']", 'Tab'),
        keydown('button', 'Enter'),
      ])
    })
  })
})