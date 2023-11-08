const { Joi } = require('celebrate');
const { validLinkRegex } = require('./regexes');

module.exports.userCreationSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(2).required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(validLinkRegex),
  }),
};

module.exports.userLoginSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(2).required()
  }),
};

module.exports.queryIdSchema = {
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
};
