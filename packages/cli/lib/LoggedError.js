import { logger } from './logger.js'

class LoggedError extends Error {
  constructor(message) {
    super(message) // 'Error' breaks prototype chain here
    Object.setPrototypeOf(this, new.target.prototype) // restore prototype chain
    logger.error(message)
  }
}

module.exports = {
  LoggedError
}
