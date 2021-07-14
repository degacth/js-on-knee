import { createStore } from 'vuex'

export const addMessage = 'add-message'
export const messages = 'messages'
export const connect = 'connect'
export const disconnect = 'disconnect'

export const serverUrl = process.env.VUE_APP_SERVER_URL
const createConnection = (username, onMessageHandler) => {
  const ws = new WebSocket(`${serverUrl}/${username}`)
  ws.onmessage = onMessageHandler

  return new Promise((res, rej) => {
    ws.onopen = () => res(ws)
    ws.onerror = e => rej(e)
  })
}

let connection = null
const actions = {
  [addMessage](_, msg) {
    connection.then(c => c.send(msg))
  },

  [connect]({ commit }, username) {
    connection = createConnection(username, event => {
      const messageTypes = {
        message: addMessage,
        messageList: messages,
      }

      const msg = JSON.parse(event.data)
      const handlerName = messageTypes[msg.type]
      if (!handlerName) throw new Error('Unsupported message type ' + msg)

      commit(handlerName, msg.data)
    })
  },

  [disconnect]() {
    connection.then(c => c.close())
  }
}

export default createStore({
  state: {
    messages: [],
    user: null,
  },
  mutations: {
    [addMessage](state, payload) {
      state.messages = [...state.messages, payload]
    },
    [messages](state, payload) {
      state.messages = payload
    }
  },
  actions,
})


