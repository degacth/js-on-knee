const {BasePage} = require('./base-page')

class MenuPage extends BasePage {
  newRecord() {
    return this.click('#menu-item-record-new')
  }

  isVisible() {
    return super.isVisible('#main-menu')
  }
}

module.exports = {MenuPage}
