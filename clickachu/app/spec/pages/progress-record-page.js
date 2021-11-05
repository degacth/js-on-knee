const {BasePage} = require('./base-page');

class ProgressRecordPage extends BasePage {
  cancelControlSelector = '#progress-record-cancel-control'

  isStarted() {
    return this.isVisible('#progress-record-controls')
  }

  stop() {
    return this.click('#progress-record-stop-control')
  }

  isStopped() {
    return this.isVisible(this.cancelControlSelector)
  }

  cancel() {
    return this.click(this.cancelControlSelector)
  }
}

module.exports = {ProgressRecordPage}