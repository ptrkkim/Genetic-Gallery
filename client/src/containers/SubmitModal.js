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
    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    const body = JSON.stringify({
      title: this.state.title,
      artist: this.state.artist,
      originalImg: this.props.originalSrc,
      artImg: this.props.artSrc,
    });

    const options = {
      method: 'POST',
      headers,
      body,
    };

    fetch('/api/images', options)
      .then(() => this.props.closeModal())
      .catch(err => console.error(err));
  }

  // so we only close modal when clicking outer div
  stopPropagation = (evt) => {
    evt.stopPropagation();
  }

  render() {
    const { originalSrc, artSrc, closeModal } = this.props;
    return (
      <div className={background} onClick={closeModal}>
        <div className={modal} onClick={this.stopPropagation}>
          <GalleryCard
            originalSrc={originalSrc}
            artSrc={artSrc}
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

SubmitModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  originalSrc: PropTypes.string.isRequired,
  artSrc: PropTypes.string.isRequired,
};

export default SubmitModal;