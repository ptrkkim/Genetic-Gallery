import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GalleryCard from '../components/GalleryCard';
import { background, modal } from './styles/submitModal.css';

class SubmitModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      artist: '',
    };
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

  render() {
    const { originalBlob, artBlob, closeModal } = this.props;
    return (
      <div className={background}>
        <div className={modal}>
          <GalleryCard originalBlob={originalBlob} artBlob={artBlob} />
          <input type="text" />
          <button onClick={closeModal}>Submit</button>
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
