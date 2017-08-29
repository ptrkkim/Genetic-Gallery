const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('./db');
const api = require('./api');

const PORT = process.env.PORT || 3001;
const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

const appSetup = () => app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use('/api', api)
  .use(function (err, req, res, next) {
    console.log('Error message:', err.message);
    console.log(err.stack);
    res.sendStatus(err.status || 500);
  });

const listenUp = () =>
  app.listen(PORT, () =>
    console.log(`listening on port ${PORT}`));

const syncDb = () =>
  db.sync();
  // db.sync({ force: true });

syncDb()
  .then(appSetup)
  .then(listenUp);
