const appEvents = require('./app-events')
const recordEvents = require('./record-events')
const settingsEvents = require('./settings-events')

const init = (options) => {
  appEvents()
  recordEvents(options)
  settingsEvents(options)
}

module.exports = {init}
