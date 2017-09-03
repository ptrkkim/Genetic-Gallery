import React from 'react';
import PropTypes from 'prop-types';

const GalleryCard = ({ originalSrc, artSrc }) => {
  // const myURL = window.webkitURL || window.URL; // firefox and chrome

  // const originalURL = originalSrc
  //   ? myURL.createObjectURL(originalSrc)
  //   : null;
  // const artURL = artSrc
  //   ? myURL.createObjectURL(artSrc)
  //   : null;

  const originalImg = <img src={originalSrc} alt="original" />;
  const artImg = <img src={artSrc} alt="art" />;

  console.log('ogSrc', Boolean(originalSrc));
  console.log('artSrc', Boolean(artSrc));
  return (
    <div>
      {originalSrc ? originalImg : null}
      {artSrc ? artImg : null}
    </div>
  );
};

GalleryCard.propTypes = {
  originalSrc: PropTypes.string.isRequired,
  artSrc: PropTypes.string.isRequired,
};

export default GalleryCard;
