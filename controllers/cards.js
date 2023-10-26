const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id
  Card.create({ name, link, owner })
    .then(card => res.send(card))
    .catch(err => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

module.exports.getAllCards = (req, res) => {
  Card.find({})
  .then(cards => res.send(cards))
  .catch(err => res.status(500).send({ message: `Произошла ошибка ${err} ` }));
};