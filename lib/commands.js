// allow warn and error console logging
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
'use strict'

/**
 *
 *
 * @class CalcUnaryCommand
 */
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
/**
 *
 *
 * @class CalcFunctionCommand
 */
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

/**
 *
 *
 * @class ClearPreviousCommand
 * @extends {CalcFunctionCommand}
 */
class ClearPreviousCommand extends CalcFunctionCommand {
  execute (outputQueue) {
    outputQueue.pop() // pop previous
    return outputQueue
  }
}

/**
 *
 *
 * @class ClearAllCommand
 * @extends {CalcFunctionCommand}
 */
class ClearAllCommand extends CalcFunctionCommand {
  execute (outputQueue) {
    // empty the output queue
    return []
  }
}

/**
 *
 *
 * @class FactorialCommand
 * @extends {CalcUnaryCommand}
 */
class FactorialCommand extends CalcUnaryCommand {
  constructor (context) {
    super(context)
    // use this to cache factorial results to speed it up using mnemonics
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

/**
 *
 *
 * @class OneDividedByX
 * @extends {CalcUnaryCommand}
 */
class OneDividedByX extends CalcUnaryCommand {
  execute (operand) {
    return 1 / operand
  }
}

class NegateCommand extends CalcUnaryCommand {
  execute (operand) {
    return 0 - operand
  }
}

class PositiveCommand extends CalcUnaryCommand {
  execute (operand) {
    return 0 + operand
  }
}

module.exports = {
  AdditionCommand: AdditionCommand,
  SubtractionCommand: SubtractionCommand,
  DivisionCommand: DivisionCommand,
  MultiplyCommand: MultiplyCommand,
  PowCommand: PowCommand,
  ClearPreviousCommand: ClearPreviousCommand,
  FactorialCommand: FactorialCommand,
  OneDividedByX: OneDividedByX,
  ClearAllCommand: ClearAllCommand,
  NegateCommand: NegateCommand,
  PositiveCommand: PositiveCommand
}
