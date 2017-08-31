const router = require('express').Router();
const Image = require('../db/models/image');

router.get('/', (req, res, next) => {
  res.send('Image routes not set up yet');
});

// expects {title, artist, image}
router.post('/', (req, res, next) => {
  const { original, art } = req.body;
  Image.submit(original, art)
    .then(combined => res.json(combined))
    .catch(next);
});

module.exports = router;
