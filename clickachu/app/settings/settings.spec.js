const {expect} = require('chai')
const { MemoryStorage, Settings } = require('.')

describe.only('settings specification', () => {
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
})