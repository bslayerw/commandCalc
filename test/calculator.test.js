/* eslint-env node, mocha */
const assert = require('assert')
const chai = require('chai')

const Calculator = require('../lib/calculator')
const Calc = new Calculator.Calculator()

describe('Calculator', function () {
  describe('#evaluate', function () {
    const expression = '2+2'
    it(`should return 4. Testing addition:${expression} = 4`, function () {
      assert.equal(4, Calc.evaluate(expression))
    })
  })
  describe('#evaluate', function () {
    const expression = '-5*5/3'
    it(`should return -8.333333. Testing addition:${expression} = -8.333333`, function () {
      const result = Calc.evaluate(expression)
      assert.equal(-8.333333333333334, result)
    })
  })
  describe('#evaluate', function () {
    const expression = '1+1'
    it(`should return 2. Testing addition:${expression} = 2`, function () {
      assert.equal(2, Calc.evaluate(expression))
    })
  })
  describe('#evaluate', function () {
    const expression = '(-(1+1)) * 10'
    it(`should return -20. Testing addition and multiplication with parenthese order precedences:  ${expression} = -20`, function () {
      assert.equal(-20, Calc.evaluate(expression))
    })
  })
  describe('#evaluate', function () {
    const expression = '0.5 * 2'
    it(`should return 1.  Testing multiplication: ${expression} = 1`, function () {
      assert.equal(1, Calc.evaluate(expression))
    })
  })

  describe('#evaluate', function () {
    const expression = 'Adas$#@@Q'
    it(`should throw invalid exception.  Testing invalid input: ${expression}`, function () {
      chai.expect(() => Calc.evaluate(expression)).to.throw(`invalid input '${expression}'`)
    })
  })
  describe('#evaluate', function () {
    const expression = '55+5'
    it(`should return 60.  Testing addition: ${expression}`, function () {
      assert.equal(60, Calc.evaluate(expression))
    })
  })

  describe('#evaluate', function () {
    const expression = '55+105'
    it(`should return 160.  Testing addition: ${expression}`, function () {
      assert.equal(160, Calc.evaluate(expression))
    })
  })

  describe('#evaluate', function () {
    const expression = '55+105*10'
    it(`should return 160.  Testing addition: ${expression}`, function () {
      assert.equal(1105, Calc.evaluate(expression))
    })
  })
  describe('#evaluate', function () {
    const expression = '5 + (-5)'
    it(`should return 0.  Testing addition: ${expression}`, function () {
      assert.equal(0, Calc.evaluate(expression))
    })
  })

  describe('#evaluate', function () {
    const expression = '15 + (-5)'
    it(`should return 10.  Testing addition: ${expression}`, function () {
      assert.equal(10, Calc.evaluate(expression))
    })
  })

  describe('#evaluate', function () {
    const expression = '-15 + (-5)'
    it(`should return -20.  Testing addition: ${expression}`, function () {
      assert.equal(-20, Calc.evaluate(expression))
    })
  })

  /* describe('#evaluate', function () {
    const expression = '3 * -5'
    it(`should return -15.  Testing addition: ${expression}`, function () {
      assert.equal(-15, Calc.evaluate(expression))
    })
  }) */

  describe('#evaluate', function () {
    const expression = '-5 + (-5)'
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
    const expression = ' 5^2 + 9 ' // 120 / 12 + 9 = (120 / 12) + 9
    it(`Test power expression evaluation should return 34.  Testing addition: ${expression}`, function () {
      assert.equal(34, Calc.evaluate(expression))
    })
  })
  describe('#evaluate', function () {
    const expression = '0.5   1/x   *   2 ' // 120 / 12 + 9 = (120 / 12) + 9
    it(`Test 1/x expression evaluation should return 4  Testing addition: ${expression}`, function () {
      assert.equal(4, Calc.evaluate(expression))
    })
  })

  describe('#evaluate', function () {
    const expression = '7   +   8   C   +   7' //
    it(`Test C expression evaluation should return 14  Testing addition: ${expression}`, function () {
      assert.equal(14, Calc.evaluate(expression))
    })
  })
  describe('#evaluate', function () {
    const expression = '5!   /   12   A   +   9 ' //
    it(`Test A expression evaluation should return 9  Testing addition: ${expression}`, function () {
      assert.equal(9, Calc.evaluate(expression))
    })
  })
  /*describe('#evaluate', function () {
    const expression = '7 + - 6' //
    it(`Test A expression evaluation should return 1  Testing addition: ${expression}`, function () {
      assert.equal(1, Calc.evaluate(expression))
    })
  }) */
  describe('#evaluate', function () {
    const initialExpression = '4+4'
    const expression = '+5' //
    it(`Test evaluting binary single expressions by applying previous memory state [${initialExpression}] to expression: ${expression}`, function () {
      let result = Calc.evaluate(initialExpression)
      assert.equal(8, result)
      result = Calc.evaluate(expression)
      assert.equal(13, result)
    })
  })
})
