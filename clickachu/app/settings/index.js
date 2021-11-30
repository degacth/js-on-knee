const _ = require('lodash')
const fs = require('fs/promises')
const {app} = require('electron')
const {existsSync} = require('fs')

const defaultAppPath = () => app?.getPath('documents') ?? '.'
const latestDirs = 'latestDirs'

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

  withStorageUpdate = (path, cb) => async (...args) => {
    const storageData = await this.read()
    const data = _.get(storageData, path)
    const result = await cb(data, ...args)
    
    _.set(storageData, path, result)
    return this.storage.save(storageData)
  }

  addRecent = this.withStorageUpdate('recent', ({items, limit}, item) => ({
    items: _.chain([item]).union(items).take(limit).value(),
    limit,
  }))

  recentItems = async () => _.get(await this.read(), 'recent.items')

  latestDirs = async () => {
    const dirs = _.get(await this.read(), latestDirs)
    for (const [k, v] of Object.entries(dirs)) {
      if (!existsSync(v)) dirs[k] = defaultAppPath()
    }

    return dirs
  }

  updateLatestDirs = this.withStorageUpdate(latestDirs, (data, dirs) => _.assign(data, dirs))

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
