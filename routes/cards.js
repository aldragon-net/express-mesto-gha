const cardsRouter = require('express').Router(); // создали роутер
const { createCard, getUser, getAllCards } = require('../controllers/cards');

cardsRouter.put('/:id/likes', (req, res) => {
  // if (!users[req.params.id]) {
  //   res.send(`Такого пользователя не существует`);
  //   return;
  // }
  res.send(`Лайк на карточку ${req.params.id}`);
});

cardsRouter.delete('/:id/likes', (req, res) => {
  // if (!users[req.params.id]) {
  //   res.send(`Такого пользователя не существует`);
  //   return;
  // }
  res.send(`Дизлайк на карточку ${req.params.id}`);
});

cardsRouter.delete('/:id', (req, res) => {
  // if (!users[req.params.id]) {
  //   res.send(`Такого пользователя не существует`);
  //   return;
  // }
  res.send(`Удаление карточки ${req.params.id}`);
});

cardsRouter.get('/', getAllCards);

cardsRouter.post('/', createCard);

module.exports = cardsRouter; // экспортировали роутер