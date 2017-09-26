import React from 'react';
import PropTypes from 'prop-types';
import { pauseBtn, resumeBtn, clearBtn, submitBtn } from '../containers/styles/buttons.css';

const PauseResumeClear = ({ pause, resume, clear, isPlaying }) => {
  const pauseOrResume = isPlaying
    ? <button className={pauseBtn} onClick={pause}>Pause</button>
    : <button className={resumeBtn} onClick={resume}>Resume</button>;

  return (
    <div>
      {pauseOrResume}
      <button className={clearBtn} onClick={clear}>Clear</button>
      <button className={submitBtn} onClick={this.openModal}>Submit</button>
    </div>
  );
};

PauseResumeClear.propTypes = {
  pause: PropTypes.func.isRequired,
  resume: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default PauseResumeClear;
