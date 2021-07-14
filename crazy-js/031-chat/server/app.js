const {createServer} = require('http')
const WS = require('ws')
const {createHttpTerminator} = require('http-terminator')
const config = require('./config')
const Store = require('./store')

const init = port => {
  const db = new Store()
  const server = createServer()
  const wsServer = new WS.Server({server})
  const encode = JSON.stringify

  wsServer.on('connection', (ws, req) => {
    const username = decodeURIComponent(req.url.replace(/^\//, ''))
    ws.send(encode({
      type: 'messageList',
      data: db.messages,
    }))

    ws.on('message', text => {
      const message = {username, text, date: Date.now()}
      db.add(message)

      wsServer.clients.forEach(
        client => client.readyState === WS.OPEN ? client.send(encode({
          type: 'message',
          data: message,
        })) : null
      )
    })
  })

  server.listen(port)
  return createHttpTerminator({server})
}

module.exports = {init}

if (require.main === module) {
  const port = config.port
  init(port)
  console.log(`Server started on ${port}`)
}