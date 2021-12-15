const { BasePage } = require("./base-page");

class ConfigurationPage extends BasePage {
  getSelectedInputValues = selector => async () => {
    const items = await Promise.all(
      (await this.app.client.$$(selector))
        .map(async (item) => ({
          name: await item.getValue(),
          selected: await item.isSelected(),
        }))
    )

    return items.filter(item => item.selected).map(item => item.name)
  }

  selectedEventTypeNames = this.getSelectedInputValues('#configuration-record-events li input')
  selectedSelectorTypes = this.getSelectedInputValues('#configuration-record-selector-types li input')

  rootSelector() {
    return this.value('#configuration-record-root-element')
  }

  blacklistSelector() {
    return this.value('#configuration-record-blacklist')
  }

  async closeBrowserTimeout() {
    return +(await (await this.closeBrowserTimeoutElement()).getValue())
  }

  openSelectorSettings() {
    return this.click('#configuration-selector')
  }

  async updateCloseBrowserTimeout(value) {
    const element = await this.closeBrowserTimeoutElement()
    await element.setValue(value)
    return +element.getValue()
  }

  closeBrowserTimeoutElement() {
    return this.app.client.$('#configuration-record-close-browser-timeout') 
  }

  async saveSettings() {
    return (await this.app.client.$('#configuration-save')).click()
  }
}

module.exports = {ConfigurationPage}
