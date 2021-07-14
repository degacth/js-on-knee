const path = require('path')

module.exports = {
  pages: {
    index: {
      entry: 'client/main.js',
      title: 'Chat App',
    },
  },
  chainWebpack: config => {
    config
      .entry("app")
      .clear()
      .add("./client/main.js")
      .end()
    config.resolve.alias.set("@", path.join(__dirname, "./client"))
  }
}
