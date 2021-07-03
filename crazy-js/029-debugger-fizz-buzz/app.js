const yargs = require('yargs/yargs')
const prompts = require('prompts')
const shuffle = require('shuffle-array')
const {green, red} = require('chalk')
const Table = require('cli-table')
const {fizzBuzzChecker, normalizeAnswer, fizzbuzz, fizz, buzz} = require('./src/fizz-buzz')

const args = yargs(process.argv.slice(2))
  .option('tasks', {alias: 't', describe: 'how many tasks you`ll be asked', demandOption: true})
  .option('max', {alias: 'm', describe: 'maximum number to solve', demandOption: true})
  .argv

const getUserResult = async num => {
  const {answer} = await prompts({
    type: 'text',
    name: 'answer',
    message: `${num}`,
  })

  return {
    num, answer, result: fizzBuzzChecker(num, normalizeAnswer(answer))
  }
}

const maxTasks = args.tasks
const maxNumber = args.max

!async function() {
  let numbers = new Array(maxNumber).fill(null).map((_, index) => index)
  shuffle(numbers)
  numbers = numbers.slice(0, maxTasks)

  const results = []
  for (let i = 0; i < numbers.length; i++) results.push(await getUserResult(numbers[i]))

  const table = new Table({
    head: ['#', 'number', 'answer', 'result'],
    style: {
      head: ['bold']
    }
  })

  results.forEach((result, index) => {
    table.push([
      index + 1,
      result.num,
      result.answer,
      result.result ? green('OK') : red('WRONG'),
    ])
  })

  const omitCols = 2
  const total = new Array(table[table.length - 1].length - omitCols).fill('')

  const ok = results.filter(v => v.result).length
  const wrong = results.length - ok
  total.push(`${green(ok)} / ${red(wrong)}`)

  table.push({total})
  console.log(table.toString())
}()
