const express = require('express')
const faker = require('faker')
const fs = require('fs')
const https = require('https')
const cors = require('cors')

const app = express()

faker.seed(42)
const {name, address, lorem, image, datatype} = faker

const persons = new Array(10).fill(null).map((_, index) => ({
  id: index + 1,
  name: `${name.findName()} ${name.lastName()}`,
  location: `${address.country()} ${address.city()}`,
  designation: name.jobTitle(),
  message: lorem.paragraph(),
  lorem: lorem.text(),
  avatar: image.business(200 + index, 200 + index),
  rating: datatype.float({min: 2, max: 5, precision: 0.1}),
  get audio() {
    return  `https://testimonialapi.toolcarton.com/audio/${this.id}.mp3`
  },
}))

app.use(express.static('static'))
app.use(cors())
app.get('/api', (request, response) => response.json(persons))
app.get('/api/:id', (request, response) => {
  const {id} = request.params
  const person = persons.find(p => p.id === +id)
  response.json(person)
})

module.exports = app

if (require.main === module) {
  const [,, port = 4444, host = '0.0.0.0'] = process.argv

  https.createServer({
    key: fs.readFileSync('keys/server.key'),
    cert: fs.readFileSync('keys/server.cert'),
  }, app).listen(port, host)

  console.log(`server listen ${host}:${port}`)
}
