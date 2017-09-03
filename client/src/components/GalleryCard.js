import React from 'react';
import PropTypes from 'prop-types';
import { createBackdrop } from '../containers/utils';

const GalleryCard = ({ originalSrc, artSrc }) => {
  const originalImg = <img src={originalSrc} alt="original" />;
  const backdrop = <img src={createBackdrop('white', 300)} alt="bg" />;
  const artImg = <img src={artSrc} alt="art" />;

  return (
    <div>
      {originalImg}
      {backdrop}
      {artImg}
    </div>
  );
};

GalleryCard.propTypes = {
  originalSrc: PropTypes.string.isRequired,
  artSrc: PropTypes.string.isRequired,
};

export default GalleryCard;
