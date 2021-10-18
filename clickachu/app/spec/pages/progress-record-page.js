const {BasePage} = require('./base-page');

class ProgressRecordPage extends BasePage {
  isStarted() {
    return this.isVisible('#progress-record-controls')
  }
}

module.exports = {ProgressRecordPage}