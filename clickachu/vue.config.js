const path = require('path')

module.exports = {
  publicPath: './',
  chainWebpack: config => {
    config
      .entry('app')
      .clear()
      .add('./ui/main.js')
      .end()

    config.resolve.alias.set("@", path.join(__dirname, 'ui'))
  }
}