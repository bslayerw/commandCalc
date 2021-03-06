/* eslint-env node, mocha */
const assert = require('assert')
const Calculator = require('../lib/calculator')
const commands = require('../lib/commands')
const calc = new Calculator.Calculator()
const factorialCommand = new commands.FactorialCommand(calc)
const addCommand = new commands.AdditionCommand(calc)
const subtractCommand = new commands.SubtractionCommand(calc)
const powCommand = new commands.PowCommand(calc)
const oneDivCommand = new commands.OneDividedByX(calc)
const clearAllCommand = new commands.ClearAllCommand(calc)
const negateCommand = new commands.NegateCommand(calc)
const positiveCommand = new commands.PositiveCommand(calc)
const clearPreviousCommand = new commands.ClearPreviousCommand(calc)

describe('Calculator', function () {
  describe('#addCommand execute', function () {
    const operandA = 2
    const operandB = 2

    it(`should return 4. Testing addition:${operandA}+${operandB} = 4`, function () {
      assert.equal(4, addCommand.execute(operandA, operandB))
    })
  })
  describe('#subtract execute', function () {
    const operandA = 2
    const operandB = 2

    it(`should return 4. Testing subtract:${operandA}-${operandB} = 0`, function () {
      assert.equal(0, subtractCommand.execute(operandA, operandB))
    })
  })
  describe('#FactorialCommand execute', function () {
    const expression = 5
    it(`should return 4. Testing factorial:${expression} = 120`, function () {
      assert.equal(120, factorialCommand.execute(expression))
      assert.equal(120, factorialCommand.execute(expression))
    })
  })
  describe('#PowCommand execute', function () {
    const expression = 5
    it(`should return 25. Testing pow(${expression}) = 25`, function () {
      assert.equal(25, powCommand.execute(expression))
    })
  })
  describe('#OneDivXCommand execute', function () {
    const expression = 0.5
    it(`should return 25. Testing oneDivCommand(${expression}) = 2`, function () {
      assert.equal(2, oneDivCommand.execute(expression))
    })
  }) //
  describe('#ClearCommand execute', function () {
    // '5+ (-5) A + 9'
    let expression = ['5', '+', '(', '5', ')', 'A', '+', '9']
    it(`should return 25. Testing oneDivCommand(${JSON.stringify(expression)}) = '+ 9'`, function () {
      const result = clearAllCommand.execute(expression)
      assert.equal(result, '')
    })
  })
  describe('#clearPrevious execute', function () {
    // '5+ (-5) A + 9'
    let expression = ['5', '+', 'C']
    it(`should return ['5', '+']. Testing clearPrevious(${JSON.stringify(expression)}) = ['5', '+']`, function () {
      const result = clearPreviousCommand.execute(expression)
      assert.deepEqual(result, ['5', '+'])
    })
  })
  describe('#NegateCommand execute', function () {
    // '5+ (-5) A + 9'
    let expression = 5
    it(`should return -5. Testing negateCommand(${JSON.stringify(expression)}) = '- 5'`, function () {
      const result = negateCommand.execute(expression)
      assert.equal(-5, result)
    })
  })
  describe('#Positive execute', function () {
    // '5+ (-5) A + 9'
    let expression = -5
    it(`should return +5. Testing positiveCommand(${JSON.stringify(expression)}) = '+ 5'`, function () {
      const result = positiveCommand.execute(expression)
      assert.equal(-5, result)
    })
  })
})
