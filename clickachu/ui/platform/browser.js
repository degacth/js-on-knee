const sleep = timeout => new Promise(res => setTimeout(res, timeout))

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
      
    }
  }
})
