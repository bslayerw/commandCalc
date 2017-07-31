// allow warn and error console logging
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
'use strict'

require('./extensions')
const ShuntingYardStrategy = require('./strategy/ShuntingYardStrategy').ShuntingYardStrategy

/**
 *
 *
 * @class Calculator
 */
class Calculator {
  constructor () {
    // this can be extended to support other evaluation strategies. Defaults
    // to Shunting Yard.
    this.strategy = new ShuntingYardStrategy()
  }

  getMemory () {
    return this.strategy.memory
  }
  clearGlobalMemory () {
    this.strategy.memory._global_ = null
    return this.getMemory()
  }
  getGlobalMemory () {
    return this.getMemory()._global_
  }

  /**
   *
   *
   * @param {string} infix
   * @returns the result of evaluating the @param infix
   *
   * @memberOf Calculator
   */
  evaluate (expression) {
    const evaluatedResult = this.strategy.evaluate(expression)
    return evaluatedResult
  }
}

module.exports = {
  Calculator: Calculator
}
