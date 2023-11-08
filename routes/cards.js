const cardsRouter = require('express').Router(); // создали роутер
const { celebrate, Joi } = require('celebrate');
const { queryIdSchema } = require('../utils/schemas');
const {
  createCard,
  deleteCard,
  getAllCards,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRouter.put('/:id/likes', celebrate(queryIdSchema), likeCard);
cardsRouter.delete('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), dislikeCard);
cardsRouter.delete('/:id', celebrate(queryIdSchema), deleteCard);
cardsRouter.get('/', getAllCards);
cardsRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required(),
  }),
}), createCard);

module.exports = cardsRouter; // экспортировали роутер
