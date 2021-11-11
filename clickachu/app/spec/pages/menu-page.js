const {BasePage} = require('./base-page')

const recentListSelector = '#menu-item-recent-list'

class MenuPage extends BasePage {
  newRecord() {
    return this.click('#menu-item-record-new')
  }

  isVisible() {
    return super.isVisible('#main-menu')
  }

  openRecent() {
    return this.click(recentListSelector)
  }

  async recent() {
    return Promise.all(
      (await this.recentItems()).map(item => item.getText())
    )
  }

  recentItems() {
    return this.app.client.$$(`${recentListSelector} + ul li`)
  }
}

module.exports = {MenuPage}
