const env = process.env

module.exports = {
  get port() {
    return env.SERVER_PORT
  },

  get clientUrl() {
    return `http://localhost:${env.PORT}`
  }
}