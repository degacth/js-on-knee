import browser from './browser'
const platformName = process.env.VUE_APP_PLATFORM
console.assert(platformName, 'Platform is not defined')

const platform = {
  browser: () => browser,
  electron: () => require('./electron'),
}[platformName]()()

export const {app, clipboard} = platform
