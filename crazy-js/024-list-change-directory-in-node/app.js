const os = require('os')
const readline = require('readline')
const events = require('events')
const util = require('util')
const fs = require('fs')
const path = require('path')

const username = os.userInfo().username
const prompt = () => `${username}@${process.cwd()} $ `
const readdir = util.promisify(fs.readdir)
const commandWithParams = str => str.trim().split(/\s+/)

const commands = {
  cd(params) {
    const [dirName] = params
    if (dirName.startsWith('/')) return process.chdir(dirName)

    process.chdir(
      path.join(process.cwd(), dirName)
    )
  },

  async ls() {
    const files = await readdir(process.cwd())
    files.forEach(filename => console.log(filename))
  },

  exit() {
    process.exit(0)
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: prompt(),
})

const nextCommand = async () => {
  rl.prompt()

  const [commandResult] = await events.once(rl, 'line')
  const [commandName, ...params] = commandWithParams(commandResult)
  const command = commands[commandName] || (() => console.log(`Unknown command ${commandName}`))

  try { await command(params) }
  catch (e) { console.error('Command error ' + e.message) }
  rl.setPrompt(prompt())
  nextCommand()
}

console.log('Press Ctrl + C for exit')
nextCommand()
