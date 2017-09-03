const router = require('express').Router();
const Image = require('../db/models/image');

router.get('/', (req, res, next) => {
  Image.findAllPairs()
    .then(pairs => {
      res.json(pairs);
    })
    .catch(next);
});

// expects {title, artist, image}
router.post('/', (req, res, next) => {
  const { title, artist, originalImg, artImg } = req.body;

  Image.submit(title, artist, originalImg, artImg)
    .then(() => res.sendStatus(201))
    .catch(next);
});

module.exports = router;
