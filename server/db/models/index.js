const Image = require('./image');

Image.belongsTo(Image, { as: 'Original' });
module.exports = { Image };
