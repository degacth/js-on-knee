const {expect} = require('chai')
const {MemoryStorage, Settings} = require('.')

describe('settings specification', () => {
  let settings

  describe('when user saves recent list', () => {
    let storage

    beforeEach(() => {
      storage = new MemoryStorage({
        recent: {
          items: ['a', 'b', 'c', 'd', 'e'],
          limit: 5,
        }
      })

      settings = new Settings(storage)
    })

    it('should add recent item in front of list', async () => {
      await settings.addRecent('x')
      expect(await settings.recentItems()).to.be.deep.equal(['x', 'a', 'b', 'c', 'd',])
    })

    it('should add only one item', async () => {
      const storageData = await storage.read()
      storageData.recent.items = []
      await storage.save(storageData)

      await settings.addRecent('x')
      expect(await settings.recentItems()).to.be.deep.equal(['x'])
    })

    it('should update order of items', async () => {
      await settings.addRecent('d')
      expect(await settings.recentItems()).to.be.deep.equal(['d', 'a', 'b', 'c', 'e'])
    })
  })

  describe('when user work with directories', () => {
    let storage

    beforeEach(() => {
      storage = new MemoryStorage({
        latestDirs: {
          played: '/var/lib/played',
          opened: '~/records'
        },
      })
      settings = new Settings(storage)
    })

    it('should load latest dirs with default params', async () => {
      expect(await settings.latestDirs()).to.be.deep.equal({
        played: '.',
        opened: '.',
      })
    })

    it('should update latest dirs', async () => {
      const latestDirs = {
        played: '/foo/bar',
        opened: '/hello/world'
      }

      await settings.updateLatestDirs(latestDirs)

      expect(storage.data.latestDirs).to.be.deep.equal(latestDirs)
    })
  })
})