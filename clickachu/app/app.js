require('dotenv').config()
const {menubar} = require('menubar')
const {app} = require('electron')
const {init: initEvents} = require('./events')

const isDevMode = app.commandLine.hasSwitch('dev-mode')
let height = 300
if (isDevMode) height *= 2

const mb = new menubar({
  index: `file://${__dirname}/../dist/index.html`,
  icon: `${__dirname}/../public/20x20.png`,
  browserWindow: {
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    width: 400,
    height,
  }
})

mb.on('after-create-window', () => isDevMode && mb.window.openDevTools())
mb.on('ready', () => mb.tray.on('right-click', () => {
  isDevMode && setTimeout(() => app.quit(), 200)
}))

initEvents()
