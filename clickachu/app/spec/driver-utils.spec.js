const {DriverBuilder, watchClosedByUser} = require('../driver-utils')

describe('driver utils specification', () => {
  let driver = null

  beforeEach(async () => {
    driver = await new DriverBuilder().build()
  })

  describe('when user close browser', () => {
    let quitPromise = null

    beforeEach(() => {
      quitPromise = watchClosedByUser(driver, 100)
      driver.quit()
    })

    it('should resolve promise', async () => {
      await quitPromise
    })
  })
})