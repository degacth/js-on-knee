const sleep = timeout => new Promise(res => setTimeout(res, timeout))

const recent = new Set([
  `D:\\Data\\records\\www.google.com.json`,
  `D:\\Data\\records\\yandex.ru.json`,
  '/var/lib/linux.org',
])

export default () => ({
  app: {
    quit() {
      window.close()
    }
  },
  clipboard: {
    readText() {
      return 'https://www.ya.ru'
    }
  },
  record: {
    async start(url) {
      await sleep(2000)
      return {}
    },
    stop() {
      this.stopHandler()
    },
    watch(stopHandler) {
      this.stopHandler = stopHandler
    },
    save() {

    },
    cancel() {
      
    },
    open() {
      return '/some/fake/file.json'
    },
    play() {

    }
  },
  settings: {
    async recent() {
      await sleep(1000)
      return [...recent]
    },
    addRecent(path) {
      recent.add(path)
    },
    async globalConfig() {
      return {
        recordEvents: {
          hello: true,
          world: true,
          foo: false,
          bar: false,
        },

        closeBrowserTimeout: 1000,

        selectorTypes: {
          identity: true,
          flip: true,
          ary: false,
          curry: true,
        },

        rootElementSelector: 'body',
        blacklistSelector: 'html',
      }
    },

    saveGlobalConfig(config) {
      console.log(config)
    }
  }
})
