const _ = require('lodash')

const defaultSettings = {
  recent: {
    items: [],
    limit: 5,
  }
}

class Settings {
  constructor(storage) {
    this.storage = storage
  }

  async addRecent(item) {
    const data = await this.read()
    let {items, limit} = data.recent
    items = _.chain([item]).union(items).take(limit).value()

    data.recent = {items, limit}
    await this.storage.save(data)
  }

  recentItems = async () => _.get(await this.read(), 'recent.items')
  read = async () => _.defaultsDeep(await this.storage.read(), defaultSettings)
}

class MemoryStorage {
  constructor(data) {
    this.data = data
  }

  read = async () => this.data
  save = async (data) => this.data = data
}

class FileStorage {

}

module.exports = {Settings, MemoryStorage, FileStorage}
