const Image = require('./image');

Image.belongsTo(Image, { as: 'original' });
module.exports = { Image };
