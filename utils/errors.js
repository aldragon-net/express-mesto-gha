const { STATUSES } = require('./statuses');

module.exports.handleUserError = (err, res) => {
  if (err.name === 'ValidationError') {
    res.status(STATUSES.BAD_REQUEST).send({ message: `Недопустимые данные пользователя: ${err.message}` });
    return;
  }
  if (err.name === 'CastError') {
    res.status(STATUSES.BAD_REQUEST).send({ message: 'Неверный формат ID пользователя' });
    return;
  }
  if (err.name === 'DocumentNotFoundError') {
    res.status(STATUSES.NOT_FOUND).send({ message: 'Запрашиваемый пользователь не найден' });
    return;
  }
  res.status(STATUSES.INTERNAL).send({ message: 'На сервере произошла ошибка' });
};

module.exports.handleCardError = (err, res) => {
  if (err.name === 'ValidationError') {
    res.status(STATUSES.BAD_REQUEST).send({ message: `Недопустимые данные карточки: ${err.message}` });
    return;
  }
  if (err.name === 'CastError') {
    res.status(STATUSES.BAD_REQUEST).send({ message: 'Неверный формат ID карточки' });
    return;
  }
  if (err.name === 'DocumentNotFoundError') {
    res.status(STATUSES.NOT_FOUND).send({ message: 'Запрашиваемая карточка не найдена' });
    return;
  }
  res.status(STATUSES.INTERNAL).send({ message: 'На сервере произошла ошибка' });
};
