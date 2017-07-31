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
})
