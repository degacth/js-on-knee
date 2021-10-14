const appEvents = require('./app-events')
const recordEvents = require('./record-events')

const init = () => {
  appEvents()
  recordEvents()
}

module.exports = {init}
