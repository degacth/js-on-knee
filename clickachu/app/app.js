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
      enableRemoteModule: app.commandLine.hasSwitch('enable-remote')
    },
    width: 400,
    height,
    alwaysOnTop: app.commandLine.hasSwitch('on-top')
  },
  preloadWindow: app.commandLine.hasSwitch('preload-window')
})

mb.on('after-create-window', () => isDevMode && mb.window.openDevTools())
mb.on('ready', () => mb.tray.on('right-click', () => {
  isDevMode && setTimeout(() => app.quit(), 200)
}))

initEvents({mb})
