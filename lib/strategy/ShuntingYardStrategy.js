const Strategy = require('./Strategy').Strategy
const commands = require('../commands.js')

const LEFT_ASSOCIATE = 0
const RIGHT_ASSOCIATE = 1

/**
 *
 *
 * @class ShuntingYardStrategy
 * @extends {Strategy}
 */
class ShuntingYardStrategy extends Strategy {
  constructor () {
    super()
    this.operatorStack = []
    this.currentResultStack = []
    this.currentExpression = ''
    const context = this

    // store results in an hash. This can be extended to store variable assignment
    this.memory = {
      _global_: null
    }

    this.functions = {
      'C': {
        operatorCommand: new commands.ClearPreviousCommand(context)
      },
      'A': {
        operatorCommand: new commands.ClearAllCommand(context)
      }
    }
    this.unaryOperators = {
      '!': {
        operatorCommand: new commands.FactorialCommand(context)
      },
      '1/x': {
        operatorCommand: new commands.OneDividedByX(context)
      }
    }
    this.operators = {
      '^': {
        precedence: 4,
        associativity: RIGHT_ASSOCIATE,
        operatorCommand: new commands.PowCommand(context)
      },
      '/': {
        precedence: 3,
        associativity: LEFT_ASSOCIATE,
        operatorCommand: new commands.DivisionCommand(context)
      },
      '*': {
        precedence: 3,
        associativity: LEFT_ASSOCIATE,
        operatorCommand: new commands.MultiplyCommand(context)
      },
      '+': {
        precedence: 2,
        associativity: LEFT_ASSOCIATE,
        operatorCommand: new commands.AdditionCommand(context)
      },
      '-': {
        precedence: 2,
        associativity: LEFT_ASSOCIATE,
        operatorCommand: new commands.SubtractionCommand(context)
      }
    }
    this.unaryOperatorKeys = Object.keys(this.unaryOperators)
    this.binaryOperatorKeys = Object.keys(this.operators)
    this.supportedOperators = Object.keys(this.operators).concat(
      Object.keys(this.unaryOperators)
    )
    this.supportedBinaryOperators = this.binaryOperatorKeys.join('')
  }
  evaluate (expression) {
    const result = this._infixToPostfix(expression)
    let operandStack = []
    // check if the resuling infix is a binary single operation. If so then we take the result from memory and apply it.

    result.forEach(value => {
      if (typeof (value) === 'number') {
        operandStack.push(value)
      } else {
        const operandB = operandStack.pop()
        let operandA = operandStack.last()

        // it's an operator, if it's binary pop 2 operands off stack and store them
        // handle unary operators
        if (!operandA) {
          // unary operator, we don't have 2 operands
          if (value.indexOf('-') !== -1) {
            let result = 0 - Number(operandB)
            operandStack.push(result)
          } else if (value.indexOf('+') !== -1) {
            let result = 0 + Number(operandB)
            operandStack.push(result)
          } else {
            const operator = this.unaryOperators[value]
            if (operator) {
              const operator = this.unaryOperators[value]
              let result = operator.operatorCommand.execute(Number(operandB))
              operandStack.push(result)
            } else {
              throw Error(`Unknown unary operator ${value}`)
            }
          }
        } else {
          // lookup and apply operator command
          let operator = this.operators[value]
          if (!operator) {
            throw new Error(`Unknown operator '${value}'`)
            // could be a function operator
            /* operator = this.functions[value]
            if (!operator) {
              throw new Error(`Unknown operator '${value}'`)
            }
            console.log(`operandStack about to exec = ${JSON.stringify(operandStack)}`)
            operandStack = operator.operatorCommand.execute(operandStack) */
          } else {
            operandA = operandStack.pop()
            var result = operator.operatorCommand.execute(operandA, operandB)
            operandStack.push(result)
          }
        }
      }
    })
    // store the latest result in global memory
    this.memory['_global_'] = operandStack.last()
    return this.memory['_global_']
  }

  _handleOperatorAsFirstCharacter (infixValues) {
    if (this.binaryOperatorKeys.indexOf(infixValues[0]) !== -1) {
      // starts with - or +, get the next operand and process first
      if (infixValues.length > 2) {
        if ('-+'.indexOf(infixValues[0]) !== -1) {
          // negative or positive
          // remove the first 2, apply operator to second token
          const operator = infixValues.shift()
          const operand = infixValues.shift()
          if (operator === '-') {
            const result = 0 - Number(operand)
            infixValues.unshift(result)
          } else {
            const result = 0 + Number(operand)
            infixValues.unshift(result)
          }
        }
      } else {
        // handle from memory
        return this._handleMemory(infixValues)
      }
    }
    return infixValues
  }

  /**
     * This method uses the shunting-yard algorithm to parse a mathematical
     * expression specified in infix notiation and produce a prefix notiation string
     *
     * For more information check out wikipedia https://en.wikipedia.org/wiki/Shunting-yard_algorithm
     * Reference for Order of operator: https://en.wikipedia.org/wiki/Order_of_operations
     *
     * @param {string} infix value to be converted to RPN (reverse polish notiation)
     * @returns {string} @param infix converted to RPN
     * @memberof Calculator
     */
  _infixToPostfix (infixValue) {
    let outputQueue = []
    let infix = `${infixValue}`
    // edge case if first character is an operator
    infix = infix.split(' ').join('')
    // split the expression into an array by operators as seperator
    infix = infix.split(/(1\/x|[\(\)\+\-\^\*\/\!CA])/).clean()
    // not the most optimal way to implement this, TODO: take another look at a more optimal way to handle these type of function
    let functionIndex = infix.indexOf('C')
    if (functionIndex !== -1 && infix.length > 2) {
      infix.splice(functionIndex - 1, 2)
    }
    functionIndex = infix.indexOf('A')
    if (functionIndex !== -1) {
      infix.splice(0, functionIndex + 1)
      // need to clear the memorhy too .
      this.memory._global_ = null
    }

    infix = this._handleOperatorAsFirstCharacter(infix)

    for (let i = 0; i < infix.length; i++) {
      let token = infix[i]
      // check if token has single operator, we do this during the shunting yard instead
      // for trying to build a RPN from these parts of the expression
      if (typeof (token) === 'number') {
        outputQueue.push(token)
      } else if (token.isNumeric()) {
        outputQueue.push(Number(token))
      } else if (this.unaryOperators.hasOwnProperty(token)) { // unary operators take precedence over binary operators
        let operand = outputQueue.pop()
        outputQueue.push(Number(operand))
        outputQueue.push(token)
        // handling in the shunting yard
      } else if (this.operators.hasOwnProperty(token)) {
        if ('-+'.indexOf(token) !== -1) {
        // if it's not unary put it back
          if (outputQueue.length === 0) {
            outputQueue.push(token)
          }
          if (outputQueue.length !== 0 && (this.operators.hasOwnProperty(this.operatorStack.last())/* || this.operatorStack.last() === ')' */)) {
            // if it's unary we apply the operator to the operand now
            let operand = outputQueue.pop()
            if (token === '-') {
              outputQueue.push(0 - Number(operand))
            } else if (token === '+') {
              outputQueue.push(0 + Number(operand))
            }
          }
        }
        // if it's an operator
        let o1 = token
        let o2 = this.operatorStack.length === 0 ? null : this.operatorStack.last()
        while (
          this.supportedBinaryOperators.indexOf(o2) !== -1 &&
          ((this.operators[o1].associativity === LEFT_ASSOCIATE &&
            this.operators[o1].precedence <= this.operators[o2].precedence) ||
            (this.operators[o1].associativity === RIGHT_ASSOCIATE &&
              this.operators[o1].precedence < this.operators[o2].precedence))
        ) {
          outputQueue.push(this.operatorStack.pop())
          o2 = this.operatorStack.last()
        }
        this.operatorStack.push(o1)
      } else if (token === '(') {
        this.operatorStack.push(token)
      } else if (token === ')') {
        while (this.operatorStack.last() !== '(') {
          const operator = this.operatorStack.pop()
          outputQueue.push(operator)
        }
        this.operatorStack.pop()
      } else {
        console.error(`invalid input '${infixValue}'`)
        throw new Error(`invalid input '${infixValue}'`)
      }
    }
    while (this.operatorStack.length > 0) {
      outputQueue.push(this.operatorStack.pop())
    }
    return outputQueue
  }

  /**
   *
   *
   * @returns
   *
   * @memberOf ShuntingYardStrategy
   */
  getMemory () {
    return this.memory
  }

  /**
   *
   *
   * @returns
   *
   * @memberOf ShuntingYardStrategy
   */
  getGlobalMemory () {
    return this.memory['_global_']
  }

  _handleMemory (expression) {
    // check if the expression is binary, if it's unary then we apply it to the value in memory
    // this handles statements like 5+5= +4= which should be 10 + 4= 14
    //
    if (expression.length === 2) {
      if (this.memory['_global_']) {
        const newExpression = [this.memory['_global_'].toString()].concat(expression)
        return newExpression
      }
    }
    return expression
  }
}

module.exports = {
  ShuntingYardStrategy: ShuntingYardStrategy
}
