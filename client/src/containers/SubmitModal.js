import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GalleryCard from '../components/GalleryCard';
import SubmitArtForm from '../components/SubmitArtForm';
import { background, modal, preview } from './styles/submitModal.css';

class SubmitModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      artist: '',
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escape, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escape, false);
  }

  escape = (event) => {
    if (event.keyCode === 27) this.props.closeModal(); // ESC key
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

    const { postOne, closeModal } = this.props;
    fetch('/api/images', options)
      .then(response => response.json())
      .then((imagePair) => {
        postOne(imagePair);
        closeModal();
      })
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
          <h1 className={preview}>PREVIEW</h1>
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
  postOne: PropTypes.func.isRequired,
  originalSrc: PropTypes.string.isRequired,
  artSrc: PropTypes.string.isRequired,
};

export default SubmitModal;
