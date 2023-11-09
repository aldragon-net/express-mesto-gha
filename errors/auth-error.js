const { STATUSES } = require('../utils/statuses');

class AccessDeniedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUSES.UNAUTHORIZED;
  }
}

module.exports = AccessDeniedError;
