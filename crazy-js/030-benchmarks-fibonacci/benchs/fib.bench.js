const {fibRecursive, fibNonRecursive, fibTailCall, fibRecursiveMemoized} = require('../src/fib')
const bench = require('nanobench')
const max = 40

const runCount = (count, fib) => b => {
  b.start()
  for (let i = 0; i < count; i++) fib(i)
  b.end()
}

bench('fib recursive', runCount(max, fibRecursive))
bench('fib none recursive', runCount(max, fibNonRecursive))
bench('fib tail call', runCount(max, fibTailCall))
bench('fib recursive memoized', runCount(max, fibRecursiveMemoized))