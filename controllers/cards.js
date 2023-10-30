const { isValidObjectId, Error } = require('mongoose');
const Card = require('../models/card');
const { handleCardError } = require('../utils/errors');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => handleCardError(err, res));
};

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => handleCardError(err, res));
};

module.exports.deleteCard = (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    handleCardError(new Error.CastError(), res);
    return;
  }
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (!card) { return Promise.reject(new Error.DocumentNotFoundError()); }
      return res.send(card);
    })
    .catch((err) => handleCardError(err, res));
};

module.exports.likeCard = (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    handleCardError(new Error.CastError(), res);
    return;
  }
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) { return Promise.reject(new Error.DocumentNotFoundError()); }
      return res.send(card);
    })
    .catch((err) => handleCardError(err, res));
};

module.exports.dislikeCard = (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    handleCardError(new Error.CastError(), res);
    return;
  }
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) { return Promise.reject(new Error.DocumentNotFoundError()); }
      return res.send(card);
    })
    .catch((err) => handleCardError(err, res));
};
