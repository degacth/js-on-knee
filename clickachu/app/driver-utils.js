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

  setImplicitTimeout(timeout) {
    this.implicitTimeout = timeout
    return this
  }

  async build() {
    const driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(this.options)
      .build()

    if (this.implicitTimeout) driver.manage().setTimeouts({implicit: this.implicitTimeout})
    
    return driver
  }
}

const sleep = timeout => new Promise(res => setTimeout(res, timeout))

const watchClosedByUser = async (driver, period, closeLimitTime=300) => {
  let timeoutId, resolver = null
  const stopClosedTimeout = () => {
    clearTimeout(timeoutId)
    resolver?.()
  }

  while (true) {
    try {
      const closedTimeout = new Promise((res, rej) => {
        timeoutId = setTimeout(() => rej(new Error('browser closed')), closeLimitTime)
        resolver = res
      })
      const driverHandler = driver.getAllWindowHandles()
      await Promise.race([closedTimeout, driverHandler])
    } catch (e) {
      return
    } finally {
      stopClosedTimeout()
    }

    await sleep(period)
  }
}

module.exports = {DriverBuilder, watchClosedByUser}
