const { By, Key } = require("selenium-webdriver")

module.exports = class {
  constructor(driver, baseUrl) {
    this.driver = driver
    this.baseUrl = baseUrl
  }

  open = () => this.driver.get(this.baseUrl)
  quit = () => this.driver.quit()

  signIn (username) {
    return this.submitElement(username, '#form-username')
  }

  get title() {
    return this.driver.getTitle()
  }

  get username() {
    return this.driver.findElement(By.css('.username')).then(el => el.getText())
  }

  async messages() {
    const items = await Promise.all(await this.driver.findElements(By.css('.messages ul li')))
    return await Promise.all(items.map(async item => ({
      username: await item.findElement(By.css('.message-user')).then(el => el.getText()),
      text: await item.findElement(By.css('.message-text')).then(el => el.getText()),
    })))
  }

  send(msg) {
    return this.submitElement(msg, '#form-message')
  }

  nthMessage(n) {
    return this.driver.findElement(By.css(`.messages ul li:nth-child(${n}) .message-text`)).then(el => el.getText())
  }

  async submitElement(text, elSelector) {
    const el = await this.driver.findElement(By.css(elSelector))
    await el.sendKeys(text)
    return el.sendKeys(Key.ENTER)
  }
}
