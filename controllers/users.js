const { isValidObjectId, Error } = require('mongoose');
const User = require('../models/user');
const { handleUserError } = require('../utils/errors');
const { STATUSES } = require('../utils/statuses');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
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
