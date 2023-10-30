const cardsRouter = require('express').Router(); // создали роутер
const {
  createCard,
  deleteCard,
  getAllCards,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRouter.put('/:id/likes', likeCard);
cardsRouter.delete('/:id/likes', dislikeCard);
cardsRouter.delete('/:id', deleteCard);
cardsRouter.get('/', getAllCards);
cardsRouter.post('/', createCard);

module.exports = cardsRouter; // экспортировали роутер
