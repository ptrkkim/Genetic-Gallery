const router = require('express').Router();

router.use('/images', require('./images'));

router.use((req, res, next) => {
  const err = new Error('Request did not match any route.');
  err.status = 404;
  next(err);
});

module.exports = router;
