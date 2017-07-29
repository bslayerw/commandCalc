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
    this.functions = {
      'C': {
        operatorCommand: new ClearPreviousCommand(context)
      },
      'A': {
        operatorCommand: new ClearAllCommand(context)
      }
    }
    this.unaryOperators = {
      '^': {
        operatorCommand: new PowCommand(context)
      },
      '!': {
        operatorCommand: new FactorialCommand(context)
      },
      '1/x': {
        operatorCommand: new OneDividedByX(context)
      }

    }
    this.operators = {
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
      }
    }
    this.unaryOperatorKeys = Object.keys(this.unaryOperators)
    this.binaryOperatorKeys = Object.keys(this.operators)
    this.supportedOperators = Object.keys(this.operators).concat(Object.keys(this.unaryOperators))
    this.supportedOperatorsString = this.supportedOperators.join('')
    this.supportedBinaryOperators = this.supportedOperators.join('')
  }

  evaluate (infix) {
    const result = this._infixToPostfix(infix)
    console.log(`result ${result}`)
    const operandStack = []
    result.forEach(value => {
      if (value.isNumeric()) {
        operandStack.push(Number(value))
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

    // edge case to deal with lead -|+ operator as part of the expression.
    // this could probably be handled better
    /*if (this.supportedOperators.indexOf(infix.first()) !== -1) {
      infix = `0${infix}`
    } */

    infix = infix.split(' ').clean().wrapSingleOperator(this.supportedOperators)
    // split the expression into an array by operators as seperator
    infix = infix.split(/(1\/x|[\(\)\+\-\^\*\/\!CA])/).clean()

    for (let i = 0; i < infix.length; i++) {
      let token = infix[i]
      // check if token has single operator, we do this during the shunting yard instead
      // for trying to build a RPN from these parts of the expression
      if (token.isNumeric()) {
        outputQueue.push(token)
      } else if (this.unaryOperators.hasOwnProperty(token)) { // unary operators take precedence over binary operators
        const operator = this.unaryOperators[token]
        let operand = outputQueue.pop()
        const evaluatedResult = operator.operatorCommand.execute(Number(operand))
        const result = typeof (evaluatedResult) === 'number' ? evaluatedResult.toString() : evaluatedResult
        outputQueue.push(result)
      } else if (this.operators.hasOwnProperty(token)) {
        // if it's an operator
        let o1 = token
        let o2 = this.operatorStack.last()
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
      } else if (this.functions.hasOwnProperty(token)) { // functions take pres over unary and binary
        const funcCommand = this.functions[token]
        const evaluatedResult = funcCommand.operatorCommand.execute(outputQueue)
        outputQueue.push(evaluatedResult)
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
}

class CalcUnaryCommand {
  constructor (context) {
    this.context = context
  }
  execute (operand) {}
}
/**
 *
 *
 * @class CalcCommand
 */
class CalcBinaryCommand {
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
}

class CalcFunctionCommand {
  constructor (context) {
    this.context = context
  }
  execute (outputQueue) {}
}
/**
 *
 *
 * @class AdditionCommand
 * @extends {CalcCommand}
 */
class AdditionCommand extends CalcBinaryCommand {
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
class SubtractionCommand extends CalcBinaryCommand {
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
class DivisionCommand extends CalcBinaryCommand {
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
class MultiplyCommand extends CalcBinaryCommand {
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
class PowCommand extends CalcUnaryCommand {
  execute (operandA) {
    return Math.pow(operandA, 2)
  }
}

class ClearPreviousCommand extends CalcFunctionCommand {
  execute (outputQueue) {
    outputQueue.pop()
    return ''
  }
}

class ClearAllCommand extends CalcFunctionCommand {
  execute (outputQueue) {
    // empty the output queue
    while (outputQueue.pop()) {}
    return ''
  }
}

class FactorialCommand extends CalcUnaryCommand {
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

class OneDividedByX extends CalcUnaryCommand {
  execute (operand) {
    return 1 / operand
  }
}

module.exports = {
  Calculator: Calculator,
  AdditionCommand: AdditionCommand,
  SubtractionCommand: SubtractionCommand,
  DivisionCommand: DivisionCommand,
  PowCommand: PowCommand,
  ClearPreviousCommand: ClearPreviousCommand,
  FactorialCommand: FactorialCommand,
  OneDividedByX: OneDividedByX,
  ClearAllCommand: ClearAllCommand
}
