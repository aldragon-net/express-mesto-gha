const { STATUSES } = require('./statuses');
const { MESSAGES } = require('./messages');

const NotFoundError = require('../errors/not-found-error');
const AccessDeniedError = require('../errors/auth-error');
const DuplicateError = require('../errors/duplicate-error');
const BadRequestError = require('../errors/bad-request-error');

const handleError = ({ err, res }) => {
  const { statusCode = STATUSES.INTERNAL, message } = err;
  res.status(statusCode).send({
    message: statusCode === STATUSES.INTERNAL
      ? MESSAGES.INTERNAL
      : message,
  });
};

module.exports = {
  NotFoundError, BadRequestError, AccessDeniedError, DuplicateError, handleError,
};
