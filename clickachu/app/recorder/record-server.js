const {createServer} = require('http')
const WS = require('ws')
const {createHttpTerminator} = require('http-terminator')

const decode = JSON.parse

class RecordServer {
  constructor(port, eventsHandler) {
    const server = createServer()
    const wsServer = this.wsServer = new WS.Server({ server })

    wsServer.on('connection', ws => {
      ws.on('message', text => {
        const event = decode(text)
        eventsHandler(event)
      })
    })

    server.listen(port)
    this.terminator = createHttpTerminator({ server })
    this.address = `localhost:${port}`
  }

  terminate() {
    return this.terminator.terminate()
  }
}

module.exports = {RecordServer}