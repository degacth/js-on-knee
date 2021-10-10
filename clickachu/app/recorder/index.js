const getPort = require('get-port')
const {RecordServer} = require('./record-server')

class Recorder {
  record = []
  server = null

  async init() {
    const port = await getPort()
    this.server = new RecordServer(port, event => this.record.push(event))
  }

  close() {
    return this.server.terminate()
  }

  get address() {
    return this.server.address
  }
}

module.exports = {Recorder}
