const {fizzBuzzChecker, normalizeAnswer, fizz, buzz, fizzbuzz} = require('../src/fizz-buzz')

describe('Fizz Buzz specification', () => {
  const expectTrueAnswer = (number, answer) => expect(fizzBuzzChecker(number, answer)).toBeTrue()
  const testNumbers = (numbers, answer) => numbers.forEach(n => expectTrueAnswer(n, answer))

  const fizzNumbers = [-3, 33, 42, 66]
  it('should check all numbers as fizz', () => testNumbers(fizzNumbers, fizz))

  const buzzNumbers = [5, 20, 35, 80]
  it('should check all numbers as buzz', () => testNumbers(buzzNumbers, buzz))

  const fizzBuzzNumbers = [0, 15, -15, 30]
  it('should check all numbers as fizzbuzz', () => testNumbers(fizzBuzzNumbers, fizzbuzz))

  const noneFizzBuzzNumbers = [4, 8, 11, 17, -1]
  it('should check all none fizzbuzz', () => noneFizzBuzzNumbers.forEach(n => expectTrueAnswer(n, n)))

  const answers = {
    Fizz: fizz,
    buZz: buzz,
    fizzBuzz: fizzbuzz,
    ' fizz   Buzz ': fizzbuzz,
    'Fizz    buZZ  ': fizzbuzz,
    '4': 4,
    '7': 7,
  }

  it('should normalize fizzbuzz answer', () => {
    Object.entries(answers).forEach(([k, v]) => expect(normalizeAnswer(k)).toEqual(v))
  })
})