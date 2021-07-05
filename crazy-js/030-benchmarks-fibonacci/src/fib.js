const fibRecursive = n => n <= 1 ? n : fibRecursive(n - 1) + fibRecursive(n - 2)

const fibNonRecursive = n => {
  if (n <= 1) return n

  let [index, prev, curr] = [0, 0, 1]
  while (++index < n) [prev, curr] = [curr, curr + prev]
  return curr
}

const fibTailCall = (n, a = 0, b = 1) => {
  if (n === 0) return a
  if (n === 1) return b
  return fibTailCall(n - 1, b, a + b)
}

const memoize = (fn, cache = {}) => n => {
  if (cache[n] === undefined) cache[n] = fn(n)
  return cache[n]
}

const fibRecursiveMemoized = memoize(n =>
  n <= 1 ? n : fibRecursiveMemoized(n - 1) + fibRecursiveMemoized(n - 2)
)

module.exports = { fibRecursive, fibNonRecursive, fibTailCall, fibRecursiveMemoized }
