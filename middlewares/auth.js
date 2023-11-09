const jwt = require('jsonwebtoken');
const { MESSAGES } = require('../utils/messages');
const { AccessDeniedError } = require('../utils/errors');

module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) { next(new AccessDeniedError(MESSAGES.AUTH_NEEDED)); }
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new AccessDeniedError(MESSAGES.TOKEN_FAIL));
  }
  req.user = payload;
  return next();
};
