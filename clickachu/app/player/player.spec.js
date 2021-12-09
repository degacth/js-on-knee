const {Player} = require('.')
const {DriverBuilder} = require('../driver-utils')
const {expect} = require('chai')
const _ = require('lodash')
const {keydown, click, enter} = require('../test/event-generator')
const {until, By} = require('selenium-webdriver')

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

  describe('when user play input', () => {
    const login = '[type=email]'
    const loginValue = 'user@mail.ru'

    const password = '[type=password]'
    const passwordValue = 'pa$sw0rd!ЫЫЫ'
    const rememberMe = '[type=checkbox]'

    const record = {
      startUrl: `file://${__dirname}/../test/pages/keyinput/login-page.html`,
      record: [
        ... _.map(loginValue.split(''), (char) => keydown(login, char)),
        keydown(login, 'Backspace'),
        keydown(login, loginValue[loginValue.length - 1]),
        keydown(login, 'Tab'),

        ... _.map(passwordValue.split(''), (char) => keydown(password, char)),
        keydown(password, 'Tab'),
        keydown(rememberMe, ' '),
        keydown(rememberMe, 'Enter'),
      ],
    }

    beforeEach(async () => {
      await player.play(record)
      await driver.wait(until.urlContains('?'), 1000)
    })

    it('should play keys', async () => {
      const result = JSON.parse(
        await (await driver.findElement(By.id('result'))).getText()
      )

      expect(result).to.deep.equal({
        login: loginValue, password: passwordValue, rememberme: 'on',
      })
    })
  })

  describe('when user play hover', () => {
    const record = {
      startUrl: `file://${__dirname}/../test/pages/hover/hover-menu.html`,
      record: [ enter('#menu'), click('#item1') ],
    }

    beforeEach(async () => {
      await player.play(record)
    })

    it('should select menu item with hover', async () => {
      const input = await driver.findElement(By.css('input'))
      expect(await input.getAttribute('value')).to.be.equal('on')
    })
  })
})