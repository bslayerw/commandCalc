const assert = require('assert')
const chai = require('chai')
const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')

const Calculator = require('../lib/calculator')
const calc = new Calculator.Calculator()
const factorialCommand = new Calculator.FactorialCommand(calc)
const addCommand = new Calculator.AdditionCommand(calc)
const subtractCommand = new Calculator.SubtractionCommand(calc)
const powCommand = new Calculator.PowCommand(calc)
describe('Calculator', function () {
  before(function () {
    // clear()
    console.log(
      chalk.yellow(
        figlet.textSync('Calculator Command - Unit Test', {
          horizontalLayout: 'default'
        })
      )
    )
  })
  describe('#FactorialCommand execute', function () {
    const expression = 5
    it(`should return 4. Testing addition:${expression} = 120`, function () {
      assert.equal(120, factorialCommand.execute(expression))
    })
  })
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

    it(`should return 4. Testing addition:${operandA}-${operandB} = 0`, function () {
      assert.equal(0, subtractCommand.execute(operandA, operandB))
    })
  })
  describe('#FactorialCommand execute', function () {
    const expression = 5
    it(`should return 4. Testing addition:${expression} = 120`, function () {
      assert.equal(120, factorialCommand.execute(expression))
    })
  })
  describe('#PowCommand execute', function () {
    const expression = 5
    it(`should return 25. Testing addition:pow(${expression}) = 25`, function () {
      assert.equal(25, powCommand.execute(expression))
    })
  })
})
