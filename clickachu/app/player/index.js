const {By, until, Key} = require('selenium-webdriver')

const getKeyByName = name => {
  return Key[name.toUpperCase()]
}

const eventHandlers = {
  click: async (driver, event) => {
    const el = await driver.findElement(By.css(event.el))
    await driver.wait(until.elementIsVisible(el))
    await el.click()
  },
  keydown: async (driver, event) => {
    const el = await driver.wait(until.elementLocated(By.css(event.el)))
    await driver.wait(until.elementIsVisible(el))
    const key = event.payload.key
    if (key.length === 1) return el.sendKeys(key)
    return el.sendKeys(getKeyByName(key))
  },
}

class Player {
  constructor(driver) {
    this.driver = driver
  }

  async play(record) {
    await this.driver.get(record.startUrl)

    for (const event of record.record) {
      const handler = eventHandlers[event.type]
      if (!handler) throw new Error('No handler for: ' + JSON.stringify(event))

      await handler(this.driver, event)
    }
  }
}

module.exports = {Player}