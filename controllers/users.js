const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send(user))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
  .then(user => res.send(user))
  .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getAllUsers = (req, res) => {
  User.find({})
  .then(users => res.send(users))
  .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};