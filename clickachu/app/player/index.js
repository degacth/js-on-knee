class Player {
  constructor(driver) {
    this.driver = driver
  }

  async play(record) {
    await this.driver.get(record.startUrl)
  }
}

module.exports = {Player}