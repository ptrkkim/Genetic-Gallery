import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GalleryCard from '../components/GalleryCard';
import { getMoreImages } from '../reducers/gallery';
import { container, contentBox } from './styles/gallery.css';

class GalleryContainer extends Component {
  componentDidMount() {
    if (!this.props.imagePairs.length) {
      this.props.getMoreImages(0, this.props.sortBy);
    }
    // fetch('/api/images/0/new')
    //   .then(response => response.json())
    //   .then((foundPairs) => {
    //     const imagePairs = foundPairs.map(pair => ({
    //       id: pair.id,
    //       title: pair.title,
    //       artist: pair.artist,
    //       artImg: pair.artImg,
    //       originalImg: pair.originalImg,
    //     }));

    //     this.setState({ imagePairs });
    //   });
  }

  render () {
    const cards = this.state.imagePairs.map(pair => (
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
  }
}

GalleryContainer.propTypes = {
  imagePairs: PropTypes.array.isRequired, // eslint-disable-line
  sortBy: PropTypes.string.isRequired,
  getMoreImages: PropTypes.func.isRequired,
};

// export default GalleryContainer;
const mapStateToProps = ({ gallery }) => ({
  imagePairs: gallery.imagePairs,
  sortBy: gallery.sortBy,
});

const mapDispatchToProps = {
  getMoreImages,
};

export default connect(mapStateToProps, mapDispatchToProps)(GalleryContainer);
