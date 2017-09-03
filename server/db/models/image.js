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
    type: Sequelize.BLOB,
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

module.exports = Image;
/*
Images:
Sequelize.BLOB vs. base64 data URI with Sequelize.TEXT ?????

BLOB seems to be smaller by ~30%
  might as well minimize db overhead + sending/receiving time
should be cached with little additional effort/maybe automatically

translating canvas img to/from BLOB is a bit more of a hassle than dataURL

other option: host images on S3/CDN and store links in db
explore this if BLOB/base64 prove to be exceptionally slow
*/
