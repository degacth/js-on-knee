const {Application} = require('spectron')
const electronPath = require('electron')
const {FileStorage} = require('../settings')

const settingsPath = `${__dirname}/spec-settings.json`

const app = new Application({
  path: electronPath,
  args: [
    __dirname + '/../app.js',
    '--on-top',
    '--preload-window',
    '--enable-remote',
    `--settings=${settingsPath}`,
  ],
})

class SpectronBuilder {
  static init() {
    return new SpectronBuilder()
  }

  withApp() {
    this.app = app
    return this
  }

  withSettings(settings) {
    this.settings = settings
    return this
  }

  withLogging() {
    this.logging = true
    return this
  }

  run(title, cb) {
    let storage

    describe(title, () => {
      beforeEach(async () => {
        storage = new FileStorage(settingsPath)
        await storage.save(this.settings || {})

        await this.app?.start()
        await this.app?.browserWindow.show()
      })

      afterEach(async () => {
        if (this.logging) {
          const logs = (await this.app?.client?.getMainProcessLogs()) || []
          logs.forEach(item => console.log(item))
        }
        return this.app?.stop()
      })

      cb({app, storage() {
        return storage
      }})
    })
  }
}

module.exports = {SpectronBuilder}
