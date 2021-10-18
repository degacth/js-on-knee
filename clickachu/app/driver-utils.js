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

module.exports = {DriverBuilder}
