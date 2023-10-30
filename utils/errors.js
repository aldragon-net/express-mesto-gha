const { STATUSES } = require('./statuses');

module.exports.handleUserErrors = (err, res) => {
  if (err.name === 'ValidationError') {
    res.status(STATUSES.BAD_REQUEST).send({ message: `Недопустимые данные пользователя: ${err.message}` });
    return;
  }
  if (err.name === 'CastError') {
    res.status(STATUSES.NOT_FOUND).send({ message: 'Запрашиваемый пользователь не найден' });
    return;
  }
  res.status(STATUSES.INTERNAL).send({ message: 'Неизвестная ошибка' });
};

module.exports.handleCardErrors = (err, res) => {
  if (err.name === 'ValidationError') {
    res.status(STATUSES.BAD_REQUEST).send({ message: `Недопустимые данные пользователя: ${err.message}` });
    return;
  }
  if (err.name === 'CastError') {
    res.status(STATUSES.NOT_FOUND).send({ message: 'Запрашиваемая карточка не найдена' });
    return;
  }
  res.status(STATUSES.INTERNAL).send({ message: 'Неизвестная ошибка' });
};
