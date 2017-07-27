'use strict'

require('./extensions')

const LEFT_ASSOCIATE = 0
const RIGHT_ASSOCIATE = 1

/**
 *
 *
 * @class Calculator
 */
class Calculator {
  constructor () {
    this.operatorStack = []
    this.operators = {
      '^': {
        precedence: 4,
        associativity: RIGHT_ASSOCIATE,
        operatorCommand: new PowCommand()
      },
      '1/x': {
        precedence: 3,
        associativity: LEFT_ASSOCIATE,
        operatorCommand: new DivisionCommand()
      },
      '/': {
        precedence: 3,
        associativity: LEFT_ASSOCIATE,
        operatorCommand: new DivisionCommand()
      },
      '*': {
        precedence: 3,
        associativity: LEFT_ASSOCIATE,
        operatorCommand: new MultiplyCommand()
      },
      '+': {
        precedence: 2,
        associativity: LEFT_ASSOCIATE,
        operatorCommand: new AdditionCommand()
      },
      '-': {
        precedence: 2,
        associativity: LEFT_ASSOCIATE,
        operatorCommand: new SubtractionCommand()
      }
    }
  }

  evaluate (infix) {
    const result = this._infixToPostfix(infix)
    console.log(`postfix ${result}`)
    const expression = result.match(/\S+/g) || [] // default to empty array if there's nothing to match
    // TODO: error check for valid expression to evaluate
    const operandStack = []
    expression.forEach(value => {
      if (value.isNumeric()) {
        console.log(`is numberic ${value}`)
        operandStack.push(Number(value))
      } else {
        // it's an operator, if it's binary pop 2 operands off stack and store them
        if (operandStack.length >= 2) {
          const operandB = operandStack.pop()
          const operandA = operandStack.pop()
          // lookup and apply operator command
          const operator = this.operators[value]
          if (!operator) {
            throw new Error(`Unknown operator ${value}`)
          }

          var result = operator.operatorCommand.execute(operandA, operandB)
          operandStack.push(result)
        }
      }
    })
    return operandStack[0]
  }

  /**
     * This method uses the shunting-yard algorithm to parse a mathematical
     * expression specified in infix notiation and produce a prefix notiation string
     *
     * For more information check out wikipedia https://en.wikipedia.org/wiki/Shunting-yard_algorithm
     * Reference for Order of operator: https://en.wikipedia.org/wiki/Order_of_operations
     *
     * @param {any} infix
     * @returns
     * @memberof Calculator
     */
  _infixToPostfix (infixValue) {
    let supportedOperators = Object.keys(this.operators)
    let outputQueue = ''
    // add a default starting value of 0 if the infix starts with an operator and strip all whitespace
    let infix = `${infixValue}`
    if (supportedOperators.indexOf(infix.first()) !== -1) {
      infix = `0${infix}`
    }
    // acount for trailing '=' character
    if (infixValue.last() === '=') {
      infix = infix.slice(0, -1)
    }
    infix = infix.split(' ').filter(function (character) {
      // remove all empty elements from the infix value
      return character !== ''
    }).map(function (elm) {
      const operatorIndex = supportedOperators.findIndex(function (operatorElm) {
        return elm.indexOf(operatorElm) !== -1
      })
      // if the value contains an operator wrap it with parantheses
      if (elm.isNumeric() && operatorIndex !== -1) {
        return `(0${elm})`
      }
      return elm
    }).join('')
    // add paranthese to any elements have have an operator as part of the number
    /* for (let i =0; i < infix.length; i++) {
      if ()
    } */
    console.log(`infix ${infix}`)
    // split by operators

    // split the expression into an array by operators as seperator
    infix = infix.split(/([\+\-\*\/\^\(\)])/).filter(function (character) {
      return character !== ''
    })
    console.log(`infix = ${infix}`)
    for (var i = 0; i < infix.length; i++) {
      var token = infix[i]
      if (token.isNumeric()) {
        outputQueue += token + ' '
      } else if (this.operators.hasOwnProperty(token)) {
        // if it's an operator
        var o1 = token
        var o2 = this.operatorStack.last()
        while (
          '^*/+-'.indexOf(o2) !== -1 &&
          ((this.operators[o1].associativity === LEFT_ASSOCIATE &&
            this.operators[o1].precedence <= this.operators[o2].precedence) ||
            (this.operators[o1].associativity === RIGHT_ASSOCIATE &&
              this.operators[o1].precedence < this.operators[o2].precedence))
        ) {
          outputQueue += this.operatorStack.pop() + ' '
          o2 = this.operatorStack.last()
        }
        this.operatorStack.push(o1)
      } else if (token === '(') {
        this.operatorStack.push(token)
      } else if (token === ')') {
        while (this.operatorStack.last() !== '(') {
          outputQueue += this.operatorStack.pop() + ' '
        }
        this.operatorStack.pop()
      } else {
        throw new Error(`invalid input ${infix}`)
      }
    }
    while (this.operatorStack.length > 0) {
      outputQueue += this.operatorStack.pop() + ' '
    }
    return outputQueue
  }
}

/**
 *
 *
 * @class CalcCommand
 */
class CalcCommand {
  execute () {
    console.error('not implemented')
  }
}

/**
 *
 *
 * @class AdditionCommand
 * @extends {CalcCommand}
 */
class AdditionCommand extends CalcCommand {
  execute (operandA, operandB) {
    return operandA + operandB
  }
}

/**
 *
 *
 * @class SubtractionCommand
 * @extends {CalcCommand}
 */
class SubtractionCommand extends CalcCommand {
  execute (operandA, operandB) {
    return operandA - operandB
  }
}

/**
 *
 *
 * @class DivisionCommand
 * @extends {CalcCommand}
 */
class DivisionCommand extends CalcCommand {
  execute (operandA, operandB) {
    return operandA / operandB
  }
}

/**
 *
 *
 * @class MultiplyCommand
 * @extends {CalcCommand}
 */
class MultiplyCommand extends CalcCommand {
  execute (operandA, operandB) {
    return operandA * operandB
  }
}

/**
 *
 *
 * @class PowCommand
 * @extends {CalcCommand}
 */
class PowCommand extends CalcCommand {
  execute (operandA, operandB) {
    return Math.pow(operandA, operandB)
  }
}

class DeletePrevious extends CalcCommand {
  execute (operandA, operandB) {
    return Math.pow(operandA, operandB)
  }
}

class QuitCommand extends CalcCommand {
  execute () {
    console.log('Quiting.')
  }
}

module.exports = Calculator
