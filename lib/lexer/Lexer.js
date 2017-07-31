/**
 *
 *
 * @class Strategy
 */
class Lexer {
  constructor () {
    if (new.target === Lexer) {
      throw new TypeError('Cannot construct Abstract instances directly')
    }
  }
  /**
   *
   *
   *
   * @memberOf Strategy
   */
  getMemory () {}
  /**
   *
   *
   *
   * @memberOf Strategy
   */
  getGlobalMemory () {}
  /**
   *
   *
   * @param {any} expression
   *
   * @memberOf Strategy
   */
  evaluate (expression) {}
}

module.exports = {
  Lexer: Lexer
}
