const assert = require('assert')
const chai = require('chai')
const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')

const Calculator = require('../lib/Calculator')
const Calc = new Calculator.Calculator()

describe('Calculator', function () {
  before(function () {
    // clear()
    console.log(
      chalk.yellow(
        figlet.textSync('Cmd Calculator - Unit Test', {
          horizontalLayout: 'full'
        })
      )
    )
  })

  describe('#evaluate', function () {
    const expression = '2+2='
    it(`should return 4. Testing addition:${expression} = 4`, function () {
      assert.equal(4, Calc.evaluate(expression))
    })
  })
  describe('#evaluate', function () {
    const expression = '-5*5/3='
    it(`should return -8.333333333333334. Testing addition:${expression} = -8.333333333333334`, function () {
      // because it's recuring, convert to 5 fixed decial places for testing
      console.log(Calc.evaluate(expression))
      // chai.expect(Calc.evaluate(expression)).to.be.closeTo(-8.333333333333334, 0.000000001);
      // assert.almostEqual(-8.333333333333334, Calc.evaluate(expression), 2);
      assert.equal(-8.333333333333334, Calc.evaluate(expression))
    })
  })
  describe('#evaluate', function () {
    const expression = '1+1='
    it(`should return 2. Testing addition:${expression} = 2`, function () {
      assert.equal(2, Calc.evaluate(expression))
    })
  })

  describe('#evaluate', function () {
    const expression = '(-(1+1)) * 10='
    it(`should return 20. Testing addition and multiplication with parenthese order precedences:  ${expression} = 20`, function () {
      assert.equal(20, Calc.evaluate(expression))
    })
  })
  describe('#evaluate', function () {
    const expression = '0.5 * 2='
    it(`should return 1.  Testing multiplication: ${expression} = 1`, function () {
      assert.equal(1, Calc.evaluate(expression))
    })
  })

  describe('#evaluate', function () {
    const expression = 'Adas$#@@Q='
    it(`should throw invalid exception.  Testing invalid input: ${expression}`, function () {
      chai.expect(() => Calc.evaluate(expression)).to.throw(`invalid input ${expression}`)
    })
  })

  describe('#evaluate', function () {
    const expression = '55+5='
    it(`should return 60.  Testing addition: ${expression}`, function () {
      assert.equal(60, Calc.evaluate(expression))
    })
  })

  describe('#evaluate', function () {
    const expression = '55+105='
    it(`should return 160.  Testing addition: ${expression}`, function () {
      assert.equal(160, Calc.evaluate(expression))
    })
  })

  describe('#evaluate', function () {
    const expression = '55+105*10='
    it(`should return 160.  Testing addition: ${expression}`, function () {
      assert.equal(1105, Calc.evaluate(expression))
    })
  })

  describe('#evaluate', function () {
    const expression = '5 + (-5)='
    it(`should return 0.  Testing addition: ${expression}`, function () {
      assert.equal(0, Calc.evaluate(expression))
    })
  })

  describe('#evaluate', function () {
    const expression = '15 + (-5)='
    it(`should return 10.  Testing addition: ${expression}`, function () {
      assert.equal(10, Calc.evaluate(expression))
    })
  })

  describe('#evaluate', function () {
    const expression = '-15 + (-5)='
    it(`should return -20.  Testing addition: ${expression}`, function () {
      assert.equal(-20, Calc.evaluate(expression))
    })
  })

  describe('#evaluate', function () {
    const expression = '3 * -5='
    it(`should return -15.  Testing addition: ${expression}`, function () {
      assert.equal(-15, Calc.evaluate(expression))
    })
  })
  describe('#evaluate', function () {
    const expression = '-5 + (-5)='
    it(`should return -10.  Testing addition: ${expression}`, function () {
      assert.equal(-10, Calc.evaluate(expression))
    })
  })
  describe('#evaluate', function () {
    const expression = '-5 \
    + (-5)'
    it(`Test multiline expression evaluation should return -10.  Testing addition: ${expression}`, function () {
      assert.equal(-10, Calc.evaluate(expression))
    })
  })
  describe('#evaluate', function () {
    const expression = ' 5! / 12 + 9 ' // 120 / 12 + 9 = (120 / 12) + 9
    it(`Test factorial expression evaluation should return 19.  Testing addition: ${expression}`, function () {
      assert.equal(19, Calc.evaluate(expression))
    })
  })
  describe('#evaluate', function () {
    const expression = ' 5^ + 9 ' // 120 / 12 + 9 = (120 / 12) + 9
    it(`Test power expression evaluation should return 34.  Testing addition: ${expression}`, function () {
      assert.equal(34, Calc.evaluate(expression))
    })
  })
  // 5!   /   12   A   +   9
})
