const usersRouter = require('express').Router();
const { createUser, getUser, getAllUsers, updateProfile, updateAvatar } = require('../controllers/users');

usersRouter.patch('/me/avatar', updateAvatar);
usersRouter.patch('/me', updateProfile);
usersRouter.get('/:id', getUser);
usersRouter.get('/', getAllUsers);
usersRouter.post('/', createUser);

module.exports = usersRouter;
