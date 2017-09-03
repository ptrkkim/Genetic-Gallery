import React from 'react';
import PropTypes from 'prop-types';
import { createBackdrop } from '../containers/utils';
import { container, art, moveArt } from './styles/galleryCard.css';

const GalleryCard = ({ originalSrc, artSrc }) => {
  const bgSrc = createBackdrop('white', 300);

  const originalImg = <img src={originalSrc} alt="original" />;
  const backdrop = <img src={bgSrc} alt="bg" />;
  const artImg = <img className={moveArt} src={artSrc} alt="art" />;

  return (
    <div className={container}>
      {originalImg}
      <div className={art}>
        {backdrop}
        {artImg}
      </div>
    </div>
  );
};

GalleryCard.propTypes = {
  originalSrc: PropTypes.string.isRequired,
  artSrc: PropTypes.string.isRequired,
};

export default GalleryCard;
