/**
 *
 *
 * @class Strategy
 */
class Strategy {
  constructor () {
    if (new.target === Strategy) {
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
  Strategy: Strategy
}
