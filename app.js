const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');
const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.json())
app.use((req, res, next) => {
  req.user = {
    _id: '653f95571bc1c60d5774ed6f'  // TODO: получение id юзера
  };
  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
