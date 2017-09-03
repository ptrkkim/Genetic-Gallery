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
    const original = {
      title: this.state.title,
      artist: this.state.artist,
      image: this.props.originalBlob,
    };

    const art = {
      title: this.state.title,
      artist: this.state.artist,
      image: this.props.originalBlob,
    };

    const options = {
      method: 'POST',
      body: { original, art },
    };

    fetch('/api/images', options)
      .then((response) => {
        console.log(response);
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

SubmitModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  originalBlob: PropTypes.object.isRequired, // eslint-disable-line
  artBlob: PropTypes.object.isRequired, // eslint-disable-line
};

export default SubmitModal;
