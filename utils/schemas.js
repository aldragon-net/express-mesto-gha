const { Joi } = require('celebrate');

module.exports.userCreationSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().pattern(/^[a-zA-Z0-9]{3,30}$/),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri(),
  }),
};

module.exports.userLoginSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().pattern(/[a-zA-Z0-9]{3,30}$/),
  }),
};

module.exports.queryIdSchema = {
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
};
