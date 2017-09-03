import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GalleryCard from '../components/GalleryCard';
import SubmitArtForm from '../components/SubmitArtForm';
import { background, modal } from './styles/submitModal.css';

class SubmitModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      artist: '',
    };
  }

  handleTitle = (evt) => {
    const title = evt.target.value;
    this.setState({ title });
  }

  handleArtist = (evt) => {
    const artist = evt.target.value;
    this.setState({ artist });
  }

  handleSubmit = () => {
    const formData = new FormData();

    formData.append('title', this.state.title);
    formData.append('artist', this.state.artist);
    formData.append('originalImg', this.props.originalBlob);
    formData.append('artImg', this.props.artBlob);

    const options = {
      method: 'POST',
      body: formData,
    };

    fetch('/api/images', options)
      .then((response) => {
        console.log('response!!!!!', response);
        return this.props.closeModal();
      })
      .catch(err => console.error(err));
  }

  // so we only close modal when clicking outer div
  stopPropagation = (evt) => {
    evt.stopPropagation();
  }

  render() {
    const { originalBlob, artBlob, closeModal } = this.props;
    return (
      <div className={background} onClick={closeModal}>
        <div className={modal} onClick={this.stopPropagation}>
          <GalleryCard
            originalBlob={originalBlob}
            artBlob={artBlob}
          />
          <SubmitArtForm
            handleSubmit={this.handleSubmit}
            handleTitle={this.handleTitle}
            handleArtist={this.handleArtist}
            titleValue={this.state.title}
            artistValue={this.state.artist}
          />
        </div>
      </div>
    );
  }
}

const blobShape = {
  size: PropTypes.number,
  type: PropTypes.string,
};

SubmitModal.defaultProps = {
  originalBlob: null,
  artBlob: null,
};

SubmitModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  originalBlob: PropTypes.shape(blobShape),
  artBlob: PropTypes.shape(blobShape),
};

export default SubmitModal;
