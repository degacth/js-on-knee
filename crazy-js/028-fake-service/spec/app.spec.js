const request = require('supertest')
const app = require('../app')

describe('When request to server', () => {
  const checkFirstPerson = person => {
    expect(person.id).toBe(1)

    expect(person.name).toBeTruthy()
    expect(person.location).toBeTruthy()
    expect(person.designation).toBeTruthy()
    expect(person.message).toBeTruthy()
    expect(person.lorem).toBeTruthy()
    expect(person.avatar).toBeTruthy()
    expect(person.audio).toBeTruthy()

    expect(person.rating).toBeGreaterThanOrEqual(2)
    expect(person.rating).toBeLessThanOrEqual(5)
  }

  describe('and load entities', () => {
    let response = null
    beforeEach(async () => response = await request(app).get('/api'))

    it('should has OK status code', () => expect(response.status).toBe(200))
    it('should has actual content-type', () => expect(response.headers['content-type']).toContain('json'))
    it('should has list of entities', () => expect(response.body.length).toBe(10))
    it('should has correspondng enitity structure', () => checkFirstPerson(response.body[0]))
  })

  describe('and load entity by id', () => {
    let response = null
    beforeEach(async () => response = await request(app).get('/api/1'))

    it('should has single entity', () => checkFirstPerson(response.body))
  })

  describe('and load by invalid id', () => {
    // https://expressjs.com/ru/4x/api.html#res.sendStatus
  })
})
