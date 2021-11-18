const {By, until} = require('selenium-webdriver')

class Player {
  constructor(driver) {
    this.driver = driver
  }

  async play(record) {
    await this.driver.get(record.startUrl)

    for (const event of record.record) {
      if (event.type === 'click') {
        try {
          const el = await this.driver.findElement(By.css(event.el))
          await this.driver.wait(until.elementIsVisible(el))
          await el.click()
        } catch (e) {
          console.error(`can't handle event ${JSON.stringify(event)}`, e)
          return
        }
      }
    }
  }
}

module.exports = {Player}