import React from 'react';
import PropTypes from 'prop-types';
import { pauseBtn, resumeBtn, clearBtn, submitBtn } from '../styles/buttons.css';

const PauseResumeClear = ({ pause, resume, clear, submit, isPlaying }) => {
  const pauseOrResume = isPlaying
    ? <button className={pauseBtn} onClick={pause}>PAUSE</button>
    : <button className={resumeBtn} onClick={resume}>RESUME</button>;

  return (
    <div>
      {pauseOrResume}
      <button className={clearBtn} onClick={clear}>CLEAR</button>
      <button className={submitBtn} onClick={submit}>SUBMIT</button>
    </div>
  );
};

PauseResumeClear.propTypes = {
  pause: PropTypes.func.isRequired,
  resume: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default PauseResumeClear;
