const {By} = require('selenium-webdriver')
const http = require('http')
const events = require('events')

module.exports = class {
  constructor(driver, baseUrl) {
    this.driver = driver
    this.baseUrl = baseUrl
  }

  startPage() {
    return this.driver.get(this.baseUrl)
  }

  async getFileNames() {
    const list = await this.driver.findElement(By.css('ul'))
    const items = await list.findElements(By.css('li'))
    const itemsTexts = await Promise.all(items.map(item => item.getText()))

    return itemsTexts.map(v => v.trim())
  }

  async select(name) {
    const file = await this.elementByTextContent(name)
    await file.click()
  }

  async selectFolder(name) {
    return this.select(name + '/')
  }

  elementByTextContent(text) {
    return this.driver.findElement(By.xpath(`//*[contains(text(),'${text}')]`))
  }

  async getFileContent(name) {
    const file = await this.elementByTextContent(name)
    const url = await file.getAttribute('href')
    return new Promise(resolve => http.get(url, async resp => {
      resp.setEncoding('utf-8')
      const [content] = await events.once(resp, 'data')
      resolve(content)
    }))
  }
}