const usersRouter = require('express').Router(); // создали роутер
const { createUser, getUser, getAllUsers } = require('../controllers/users');

usersRouter.patch('/me/avatar', (req, res) => {
  // if (!users[req.params.id]) {
  //   res.send(`Такого пользователя не существует`);
  //   return;
  // }
  res.send(`Обновление аватара`);
});

usersRouter.patch('/me', (req, res) => {
  // if (!users[req.params.id]) {
  //   res.send(`Такого пользователя не существует`);
  //   return;
  // }
  res.send(`Обновление профиля`);
});

usersRouter.get('/:id', getUser);

usersRouter.get('/', getAllUsers);

usersRouter.post('/', (req, res) => {console.log(req.body), createUser(req, res)});

module.exports = usersRouter; // экспортировали роутер