require('geckodriver')
const wd = require('selenium-webdriver')
const port = require('get-port')
const path = require('path')
const app = require('../app')
const AppPageObject = require('./app-page-object')

describe('When open browser with files server', () => {
  process.chdir(path.join(__dirname, 'test-dir'))
  let driver = null
  let po = null

  beforeEach(async () => {
    const appPort = await port()
    let [driverResult] = await Promise.all([
      new wd.Builder().forBrowser('firefox').build(),
      app.run(appPort),
    ])

    driver = driverResult
    po = new AppPageObject(driver, `http://localhost:${appPort}`)
  })

  afterEach(async () => {
    await Promise.all([
      app.stop(),
      driver.quit(),
    ])
  })

  describe('and open root page', () => {
    beforeEach(async () => {
      await po.startPage()
    })

    const rootDirs = ['..', 'bar/', 'foo/']

    it('should list root directory', async () => {
      expect(await po.getFileNames()).toEqual(jasmine.arrayContaining(rootDirs))
    })

    describe('and when select directory', () => {
      beforeEach(async () => {
        await po.selectFolder('bar')
      })

      it('should list directory files', async () => {
        expect(await po.getFileNames()).toEqual(jasmine.arrayContaining(['..', 'hello.tst', 'world.tst']))
      })

      it('should download file when selected', async () => {
        const content = await po.getFileContent('hello.tst')
        expect(content).toBe('test content')
      })

      describe('and when select parent folder ..', () => {

      })
    })
  })
})