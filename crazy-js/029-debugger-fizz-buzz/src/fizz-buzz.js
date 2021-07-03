const fizz = 'fizz'
const buzz = 'buzz'
const fizzbuzz = fizz + buzz

const fizzBuzzChecker = (number, answer) => {
  const results = []
  const isFizz = !(number % 3)
  const isBuzz = !(number % 5)

  if (isFizz) results.push(fizz)
  if (isBuzz) results.push(buzz)

  if (!results.length) return number === answer
  return results.join('') === answer
}

const normalizeAnswer = answer => {
  if (!isNaN(answer)) return +answer
  return answer.replace(/\W+/ig, '').toLowerCase()
}

module.exports = {fizzBuzzChecker, normalizeAnswer, fizz, buzz, fizzbuzz}