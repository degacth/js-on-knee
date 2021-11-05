const appEvents = require('./app-events')
const recordEvents = require('./record-events')

const init = (options) => {
  appEvents()
  recordEvents(options)
}

module.exports = {init}
