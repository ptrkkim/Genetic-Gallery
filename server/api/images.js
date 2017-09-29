const router = require('express').Router();
const Image = require('../db/models/image');

router.get('/', (req, res, next) => {
  Image.findAll()
    .then(images => res.json(images));
});

// expects {title, artist, image}
router.post('/', (req, res, next) => {
  const { title, artist, originalImg, artImg } = req.body;

  Image.submit(title, artist, originalImg, artImg)
    .then(imageData => res.status(201).json(imageData))
    .catch(next);
});

router.get('/:page/:sortBy', (req, res, next) => {
  const limit = 12;
  const offset = +req.params.page * limit;
  let sortBy;

  switch (req.params.sortBy) {
    case 'old':
      sortBy = ['createdAt', 'ASC'];
      break;
    default:
      sortBy = ['createdAt', 'DESC'];
      break;
  }

  Image.findAllPairs(offset, limit, sortBy)
    .then(pairs => res.json(pairs))
    .catch(next);
});

module.exports = router;
