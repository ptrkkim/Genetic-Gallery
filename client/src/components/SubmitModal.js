import React from 'react';
import PropTypes from 'prop-types';
import GalleryCard from '../components/GalleryCard';
import { background, modal } from './styles/submitModal.css';

const SubmitModal = ({ originalBlob, artBlob, closeModal }) => (
  <div className={background}>
    <div className={modal}>
      <GalleryCard originalBlob={originalBlob} artBlob={artBlob} />
      <input type="text" />
      <button onClick={closeModal}>Submit</button>
    </div>
  </div>
);

SubmitModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  originalBlob: PropTypes.object.isRequired, // eslint-disable-line
  artBlob: PropTypes.object.isRequired, // eslint-disable-line
};

export default SubmitModal;
