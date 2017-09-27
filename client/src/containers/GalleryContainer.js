import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Gallery from '../components/Gallery';
import { getMoreImages } from '../reducers/gallery';

class GalleryContainer extends Component {
  componentDidMount() {
    if (!this.props.imagePairs.length) {
      this.props.loadMore(0, this.props.sortBy);
    }
  }

  render () {
    const { page, imagePairs, sortBy, loadMore, isLoading, hasMore } = this.props;

    return (
      <Gallery
        loadMore={loadMore}
        loadArgs={[page, sortBy]}
        hasMore={hasMore}
        isLoading={isLoading}
        images={imagePairs}
      />
    );
  }
}

GalleryContainer.propTypes = {
  imagePairs: PropTypes.array.isRequired, // eslint-disable-line
  sortBy: PropTypes.string.isRequired,
  loadMore: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasMore: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
};

// export default GalleryContainer;
const mapStateToProps = ({ gallery }) => ({
  imagePairs: gallery.imagePairs,
  sortBy: gallery.sortBy,
  isLoading: gallery.isLoading,
  hasMore: gallery.hasMore,
  page: gallery.page,
});

const mapDispatchToProps = dispatch => ({
  loadMore (page, sortOrder) {
    dispatch(getMoreImages(page, sortOrder));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GalleryContainer);
