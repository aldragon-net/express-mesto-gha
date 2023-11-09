const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { celebrate, errors } = require('celebrate');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { userCreationSchema, userLoginSchema } = require('./utils/schemas');
const { NotFoundError, handleError } = require('./utils/errors');
const { MESSAGES } = require('./utils/messages');

require('dotenv').config();

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());

app.post('/signin', celebrate(userLoginSchema), login);
app.post('/signup', celebrate(userCreationSchema), createUser);
app.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);
app.use('*', auth, (req, res, next) => { next(new NotFoundError(MESSAGES.ROUTE_NOT_FOUND)); });

app.use(errors());
app.use((err, req, res, next) => {
  handleError({
    err, req, res, next,
  });
});

app.listen(PORT);
