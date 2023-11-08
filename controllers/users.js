const { isValidObjectId, Error } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { handleUserError } = require('../utils/errors');
const { STATUSES } = require('../utils/statuses');

module.exports.createUser = (req, res) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name, about, avatar,
    }))
    .then((user) => res.status(STATUSES.CREATED).send(user))
    .catch((err) => handleUserError(err, res));
};

module.exports.getUser = (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    handleUserError(new Error.CastError(), res);
    return;
  }
  User.findById(req.params.id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => handleUserError(err, res));
};

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => handleUserError(err, res));
};

module.exports.updateProfile = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $set: req.body },
    { new: true, runValidators: true },
  )
    .then((user) => res.send(user))
    .catch((err) => handleUserError(err, res));
};

module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $set: req.body },
    { new: true, runValidators: true },
  )
    .then((user) => res.send(user))
    .catch((err) => handleUserError(err, res));
};

module.exports.getProfile = (req, res) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => handleUserError(err, res));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key');
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      })
        .end();
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};
