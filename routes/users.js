const usersRouter = require('express').Router();
const {
  getUser, getAllUsers, getProfile, updateProfile, updateAvatar,
} = require('../controllers/users');

usersRouter.patch('/me/avatar', updateAvatar);
usersRouter.patch('/me', updateProfile);
usersRouter.get('/me', getProfile);
usersRouter.get('/:id', getUser);
usersRouter.get('/', getAllUsers);

module.exports = usersRouter;
