import React from 'react';
import { modal } from './styles/submitModal.css';

const SubmitModal = () => (
  <div className={modal}>
    <input type="text" />
    <button>Submit</button>
  </div>
);

export default SubmitModal;
