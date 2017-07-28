// allow warn and error console logging
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
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
    this.currentResultStack = []
    this.currentExpression = ''
    const context = this
    this.operators = {

      '1/x': {
        precedence: 3,
        associativity: LEFT_ASSOCIATE,
        operatorCommand: new DivisionCommand(context)
      },
      '/': {
        precedence: 3,
        associativity: LEFT_ASSOCIATE,
        operatorCommand: new DivisionCommand(context)
      },
      '*': {
        precedence: 3,
        associativity: LEFT_ASSOCIATE,
        operatorCommand: new MultiplyCommand(context)
      },
      '+': {
        precedence: 2,
        associativity: LEFT_ASSOCIATE,
        operatorCommand: new AdditionCommand(context)
      },
      '-': {
        precedence: 2,
        associativity: LEFT_ASSOCIATE,
        operatorCommand: new SubtractionCommand(context)
      },
      '^': {
        precedence: 3,
        associativity: LEFT_ASSOCIATE,
        operatorCommand: new PowCommand(context)
      },
      '!': {
        precedence: 3,
        associativity: LEFT_ASSOCIATE,
        operatorCommand: new FactorialCommand(context)
      }
    }
    this.supportedOperators = Object.keys(this.operators)
    this.supportedOperatorsString = this.supportedOperators.join('')
  }

  evaluate (infix) {
    const result = this._infixToPostfix(infix)
    const expression = result || [] // default to empty array if there's nothing to match
    // TODO: error check for valid expression to evaluate
    const operandStack = []
    expression.forEach(value => {
      if (value.isNumeric()) {
        operandStack.push(Number(value))
      } else if (value.indexOf('!') !== -1) {
        const evaluateValue = this.operators['!'].execute(value)
        operandStack.push(evaluateValue)
      } else {
        // it's an operator, if it's binary pop 2 operands off stack and store them
        if (operandStack.length >= 2) {
          const operandB = operandStack.pop()
          const operandA = operandStack.pop()
          // lookup and apply operator command
          const operator = this.operators[value]
          if (!operator) {
            throw new Error(`Unknown operator '${value}'`)
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
    let outputQueue = []
    let infix = `${infixValue}`
    if (infix.last() === '=') {
      infix = infix.slice(0, -1)
      infix = this.currentExpression.concat(infix)
    }
    // edge case to deal with lead -|+ operator as part of the expression.
    // this could probably be handled better
    if (this.supportedOperators.indexOf(infix.first()) !== -1) {
      infix = `0${infix}`
    }
    infix = infix.split(' ').clean().wrapSingleOperator(this.supportedOperators)

    // split the expression into an array by operators as seperator
    infix = infix.split(/([\+\-\*\/\(\)])/).clean()
    if (infix.length < 2) {
      const errMessage = `invalid input ${infixValue}`
      console.error(errMessage)
      throw new Error(errMessage)
    }
    for (let i = 0; i < infix.length; i++) {
      let token = infix[i]
      // check if token has single operator, we do this during the shunting yard instead
      // for trying to build a RPN from these parts of the expression
      let singleOpTokens = token.split(/([!^])/).clean()
      if (token.isNumeric()) {
        outputQueue.push(token)
      } else if (singleOpTokens.length === 2) {
        let evaluatedValue = this._handleSingleOperator(singleOpTokens)
        outputQueue.push(evaluatedValue)
      } else if (this.operators.hasOwnProperty(token)) {
        // if it's an operator
        let o1 = token
        let o2 = this.operatorStack.last()
        while (
          this.supportedOperatorsString.indexOf(o2) !== -1 &&
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
        console.error(`invalid input '${infix}'`)
        throw new Error(`invalid input '${infix}'`)
      }
    }
    while (this.operatorStack.length > 0) {
      outputQueue.push(this.operatorStack.pop())
    }
    return outputQueue
  }
  _handleSingleOperator (expression) {
    let token = Number(expression[0])
    let operatorString = expression[1]
    let operator = this.operators[operatorString]
    if (operator) {
      const evaluatedValue = operator.operatorCommand.execute(token)
      return evaluatedValue.toString()
    } else {
      throw new Error(`unknown operator ${operatorString}`)
    }
  }
}

/**
 *
 *
 * @class CalcCommand
 */
class CalcCommand {
  constructor (context) {
    this.context = context
    this.operators = {
      /* */
    }
  }
  execute (operandA, operandB) {
    console.error('not implemented')
    return 0
  }
  _preprocess (operandA, operandB) {
    let ops = {a: operandA, b: operandB}
    for (let opIndex = 0; opIndex < operandA.length; opIndex++) {
      // check to see if the operand contains any of the single operand operators
      const operator = this.operators[operandA[opIndex]]
      if (operator) {
        ops.a = operator.execute(operandA, operandB)
        break
      }
    }
    for (let opIndex = 0; opIndex < operandB.length; opIndex++) {
      // check to see if the operand contains any of the single operand operators
      const operator = this.operators[operandB[opIndex]]
      if (operator) {
        ops.b = operator.execute(operandA, operandB)
        break
      }
    }
    return ops
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
  execute (operandA) {
    return Math.pow(operandA, 2)
  }
}

class DeletePrevious extends CalcCommand {
  execute (operandA, operandB) {
    // TODO: implement
    return Math.pow(operandA, operandB)
  }
}

class QuitCommand extends CalcCommand {
  execute (operandA) {
    // TODO: implement
  }
}

class FactorialCommand extends CalcCommand {
  constructor (context) {
    super(context)
    this.factorialCache = []
  }
  factorial (value) {
    if (value === 0 || value === 1) {
      return 1
    }
    if (this.factorialCache[value] > 0) {
      return this.factorialCache[value]
    }
    this.factorialCache[value] = this.factorial(value - 1) * value
    return this.factorialCache[value]
  }

  execute (operandA) {
    return this.factorial(operandA)
  }
}

module.exports = {
  Calculator: Calculator,
  AdditionCommand: AdditionCommand,
  SubtractionCommand: SubtractionCommand,
  DivisionCommand: DivisionCommand,
  PowCommand: PowCommand,
  DeletePrevious: DeletePrevious,
  QuitCommand: QuitCommand,
  FactorialCommand: FactorialCommand
}
