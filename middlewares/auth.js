const jwt = require('jsonwebtoken');
const { MESSAGES } = require('../utils/messages');
const { AuthorizationError, ForbiddenError } = require('../utils/errors');

module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) { next(new ForbiddenError(MESSAGES.AUTH_NEEDED)); }
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new AuthorizationError(MESSAGES.TOKEN_FAIL));
  }
  req.user = payload;
  return next();
};
