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

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
  .then(card => res.send(card))
  .catch(err => res.status(500).send({ message: `Произошла ошибка ${err} ` }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
   req.params.id,
   { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
   { new: true },
  )
  .then(card => res.send(card))
  .catch(err => res.status(500).send({ message: `Произошла ошибка ${err} ` }));
  }

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
  .then(card => res.send(card))
  .catch(err => res.status(500).send({ message: `Произошла ошибка ${err} ` }));
}