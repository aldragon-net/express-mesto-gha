const express = require('express');
const mongoose = require('mongoose');

let _id = 56;

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}, id = ${_id}`);
});
