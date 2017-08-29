const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('./db');

const PORT = process.env.PORT || 3001
const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static("client/build"));
}

app.get('/', (req, res, next) => {
  res.send('hello you have reached the api');
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
