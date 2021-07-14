require('geckodriver')
require('dotenv').config({ path: '.env.test' })

const wd = require('selenium-webdriver')
const ChatPage = require('./chat-page')
const app = require('../server/app')
const config = require('../server/config')


describe('Chat app', () => {
  const timeout = 20000
  let terminator = null

  beforeEach(() => terminator = app.init(config.port))
  afterEach(async () => await terminator?.terminate())

  const createChatFor = async username => {
    const driver = await new wd.Builder().forBrowser('firefox').build()
    driver.manage().setTimeouts({ implicit: timeout })

    const chat = new ChatPage(driver, config.clientUrl)
    await chat.open()
    await chat.signIn(username)

    return chat
  }

  describe('when single user connected', () => {
    const chatTitle = 'Chat App'
    const testUsername = 'test-user'
    let chat = null

    beforeEach(async () => chat = await createChatFor(testUsername), timeout)
    afterEach(async () => await chat.quit())

    it('should open page', async () => expect(await chat.title).toBe(chatTitle))
    it('should connect user', async () => expect(await chat.username).toBe(testUsername))
  })

  describe('when many users connected', () => {
    const kate = 'Kate'
    const alex = 'Alex'
    const john = 'John'
    const usernames = [kate, alex, john]
    let users = null

    beforeEach(async () => users = await Promise.all(usernames
      .map(username => createChatFor(username))
    ), timeout)

    afterEach(async () => await Promise.all(users.map(user => user.quit())))

    describe('and send messages for each other', () => {
      const testMsg1 = 'It is so nice to see you again.'
      const testMsg2 = 'Hi!'

      beforeEach(async () => {
        const [first, ...others] = users
        await first.send(testMsg1)
        await Promise.all(others.map(user => user.send(testMsg2)))
        await first.nthMessage(3)
      })

      it('should read messages', async () => {
        const [kateChat] = users
        const messages = await kateChat.messages()

        expect(messages.length).toBe(3)

        const kateMsg = { username: kate, text: testMsg1 }
        const alexMsg = { username: alex, text: testMsg2 }
        const johnMsg = { username: john, text: testMsg2 }

        expect(messages).toEqual(jasmine.arrayContaining([kateMsg, alexMsg, johnMsg,]))
      })
    })
  })
})
