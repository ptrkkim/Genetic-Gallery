const Sequelize = require('sequelize');
const db = require('../db');

const Image = db.define('image', {
  title: {
    type: Sequelize.STRING,
    defaultValue: 'Untitled',
  },
  artist: {
    type: Sequelize.STRING,
    defaultValue: 'Anonymous'
  },
  image: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

const Original = Image.belongsTo(Image, { as: 'original' });

Image.submit = function(title, artist, originalImg, artImg) {
  return Image.create({
    title,
    artist,
    image: artImg,
    original: {
      title,
      artist,
      image: originalImg,
    }
  }, {
    include: [Original]
  });
};

Image.findAllPairs = function() {
  return Image.findAll({
    where: {
      originalId: { $ne: null },
    },
    include: [{ model: Image, as: 'original' }],
  })
  .then(pairs => pairs.map(pair => {
    return {
      title: pair.title,
      artist: pair.artist,
      artImg: pair.image,
      originalImg: pair.original.image,
    };
  }));
};

module.exports = Image;
/*
UPDATE: my google-fu is not strong enough???? docs are terrible???
Posting blobs was fine, but reading them/sending the resulting buffer was a big hassle
Will store images as base64 encoded strings until I run into significant performance hangups

Images:
Sequelize.BLOB vs. base64 data URI with Sequelize.TEXT ?????

BLOB seems to be smaller by ~30%
  might as well minimize db overhead + sending/receiving time
should be cached with little additional effort/maybe automatically

translating canvas img to/from BLOB is a bit more of a hassle than dataURL

other option: host images on S3/CDN and store links in db
explore this if BLOB/base64 prove to be exceptionally slow
*/
