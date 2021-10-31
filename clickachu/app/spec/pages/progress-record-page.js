const {BasePage} = require('./base-page');

class ProgressRecordPage extends BasePage {
  isStarted() {
    return this.isVisible('#progress-record-controls')
  }

  stop() {
    return this.click('#progress-record-stop-control')
  }

  isStopped() {
    return this.isVisible('#progress-record-cancel-control')
  }
}

module.exports = {ProgressRecordPage}