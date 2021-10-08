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
  }
})
