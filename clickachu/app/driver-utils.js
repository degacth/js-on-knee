require('chromedriver')

const {Builder} = require('selenium-webdriver')
const {Options} = require('selenium-webdriver/chrome')
const fs = require('fs')

class DriverBuilder {
  options = new Options()

  fluentOption = cb => (...args) => {
    cb(this.options, ...args)
    return this
  }

  noAutomation = this.fluentOption(o => o.excludeSwitches('enable-automation'))
  maximized = this.fluentOption(o => o.addArguments('start-maximized'))
  disableNotifications = this.fluentOption(o => o.addArguments('disable-notifications'))

  withRecordExtension = this.fluentOption((o, config) => {
    const pathToExtension = `${__dirname}/recorder/extension`
    o.addArguments(`load-extension=${pathToExtension}`)
    fs.writeFileSync(`${pathToExtension}/config.js`, `const CLICKACHU_CONFIG = ${JSON.stringify(config)}`)
  })

  build() {
    return new Builder()
      .forBrowser('chrome')
      .setChromeOptions(this.options)
      .build()
  }
}

const sleep = timeout => new Promise(res => setTimeout(res, timeout))

const watchClosedByUser = async (driver, period) => {
  while (true) {
    try {
      await driver.getAllWindowHandles()
    } catch (e) {
      return
    }
    await sleep(period)
  }
}

module.exports = {DriverBuilder, watchClosedByUser}
