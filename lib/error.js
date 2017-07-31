// allow warn and error console logging
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
/**
 * A useful class to extend built in error messages.
 * Blatanty ripped from https://stackoverflow.com/questions/31089801/extending-error-in-javascript-with-es6-syntax
 *
 * @class AppError
 * @extends {Error}
 */
class AppError extends Error {
  constructor (message) {
    super(message)
    this.name = this.constructor.name
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error(message)).stack
    }
  }
}

module.exports = AppError
