const {BasePage} = require('./base-page');

class NewRecordPage extends BasePage {
  rec() {
    return this.click('#new-record-start')
  }
}

module.exports = {NewRecordPage}
