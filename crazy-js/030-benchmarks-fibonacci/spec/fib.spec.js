const {fibRecursive, fibNonRecursive, fibTailCall, fibRecursiveMemoized} = require('../src/fib')
const fibs = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]

describe('Different fibs implementation', () => {
  const testImplementation = fn => () => fibs.forEach((n, index) => expect(fn(index)).toBe(n))

  it('recursive', testImplementation(fibRecursive))
  it('none recursive', testImplementation(fibNonRecursive))
  it('tail call', testImplementation(fibTailCall))
  it('recursive memoized', testImplementation(fibRecursiveMemoized))
})