import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import GalleryCard from '../components/GalleryCard';
import WithInfinite from '../HOCs/withInfinite';
import { container, contentBox } from './styles/gallery.css';

const Gallery = ({ images }) => {
  const cards = images.map(pair => (
    <GalleryCard
      key={pair.id}
      originalSrc={pair.originalImg}
      artSrc={pair.artImg}
    />
  ));

  return (
    <div className={container}>
      <CSSTransitionGroup
        component="div"
        className={contentBox}
        transitionName="fade"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        {cards}
      </CSSTransitionGroup>
    </div>
  );
};

export default WithInfinite(Gallery);

Gallery.propTypes = {
  images: PropTypes.array.isRequired, // eslint-disable-line
};
