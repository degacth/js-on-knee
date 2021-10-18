const {BasePage} = require('./base-page')

class MenuPage extends BasePage {
  newRecord() {
    return this.click('#menu-item-record-new')
  }
}

module.exports = {MenuPage}
