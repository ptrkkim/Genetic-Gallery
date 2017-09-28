require('newrelic');

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('./db');
const api = require('./api');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

const appSetup = () => app
  .use(bodyParser.json({ limit: '8mb' }))
  .use(bodyParser.urlencoded({ extended: true }))
  .use('/api', api)
  .get('/*', (req, res) => res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html')))
  .use(function (err, req, res, next) {
    console.log('Error message:', err.message);
    console.log(err.stack);
    res.sendStatus(err.status || 500);
  });

const listenUp = () =>
  app.listen(PORT, () =>
    console.log(`listening on port ${PORT}`));

const syncDb = (retries=0, maxRetries=3) =>
  db.sync()
    .then(() => console.log('Synced models to db'))
    .catch(() => {
      if (process.env.NODE_ENV === 'production' || retries > maxRetries) {
        console.error(`*************** database error ***************`);
        console.error(`  Could not connect to supplied database URL  `);
        console.error(`**********************************************`);
      }

      return new Promise(resolve =>
        require('child_process').exec(`createdb "genetic-gallery"`, resolve)
      ).then(() => syncDb(retries + 1));
    });
  // db.sync({ force: true });

syncDb()
  .then(appSetup)
  .then(listenUp);
