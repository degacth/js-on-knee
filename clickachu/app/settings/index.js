const _ = require('lodash')
const fs = require('fs/promises')

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
  constructor(filepath) {
    this.filepath = filepath
  }

  read = async () => {
    try {
      const data = await fs.readFile(this.filepath)
      if (_.isEmpty(data)) return {}

      return JSON.parse(data)
    } catch (e) {
      console.error('Load settings error', e)
    }

    return {}
  }

  save = data => fs.writeFile(this.filepath, JSON.stringify(data, null, 2))
}

module.exports = {Settings, MemoryStorage, FileStorage}
