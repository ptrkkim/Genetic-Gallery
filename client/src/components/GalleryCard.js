import React from 'react';
import PropTypes from 'prop-types';

const GalleryCard = ({ originalBlob, artBlob }) => {
  const myURL = window.webkitURL || window.URL; // firefox and chrome

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

const blobShape = {
  size: PropTypes.number,
  type: PropTypes.string,
};

GalleryCard.defaultProps = {
  originalBlob: null,
  artBlob: null,
};

GalleryCard.propTypes = {
  originalBlob: PropTypes.shape(blobShape),
  artBlob: PropTypes.shape(blobShape),
};

export default GalleryCard;
