class BasePage {
  constructor(app) {
    this.app = app
  }

  async click(selector) {
    return (await this.app.client.$(selector)).click()
  }

  async isVisible(selector) {
    return (await this.app.client.$(selector)).isDisplayed()
  }

  async value(selector) {
    return (await this.app.client.$(selector)).getValue()
  }
}

module.exports = {BasePage}
