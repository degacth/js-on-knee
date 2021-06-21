const os = require('os')

console.log(`
  free memory: ${os.freemem()}
  user dir: ${os.homedir()}
  cpu count: ${os.cpus().length}
`)
