const router = require('express').Router();
const Image = require('../db/models/image');

router.get('/', (req, res, next) => {
  res.send('Image routes not set up yet');
});

// expects {title, artist, image}
router.post('/', (req, res, next) => {
  console.log('fields', req.fields);
  console.log('files', req.files);
  const { title, artist } = req.fields; // fields + files from express-formidable
  const { originalImg, artImg } = req.files;
  Image.submit(title, artist, originalImg, artImg)
    .then(combined => res.json(combined))
    .catch(next);
});

module.exports = router;
