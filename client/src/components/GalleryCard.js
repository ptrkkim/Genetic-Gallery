import React from 'react';
import PropTypes from 'prop-types';

const GalleryCard = ({ originalBlob, artBlob }) => {
  console.log('original:::::::', originalBlob);
  console.log('art::::::::::::', artBlob);
  const myURL = window.webkitURL || window.URL; // firefox and chrome
  console.log(myURL);

  const originalURL = originalBlob
    ? myURL.createObjectURL(originalBlob)
    : null;
  const artURL = artBlob
    ? myURL.createObjectURL(artBlob)
    : null;

  const originalImg = <img src={originalURL} alt="original" />;
  const artImg = <img src={artURL} alt="art" />;

  return (
    <div>
      {originalBlob ? originalImg : null}
      {artBlob ? artImg : null}
    </div>
  );
};

GalleryCard.propTypes = {
  originalBlob: PropTypes.object.isRequired, // eslint-disable-line
  artBlob: PropTypes.object.isRequired, // eslint-disable-line
};

export default GalleryCard;
