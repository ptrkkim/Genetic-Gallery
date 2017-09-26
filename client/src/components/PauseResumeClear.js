import React from 'react';
import PropTypes from 'prop-types';

const PauseResumeClear = ({ pause, resume, clear, isPlaying }) => {
  const pauseOrResume = isPlaying
    ? <button onClick={pause}>Pause</button>
    : <button onClick={resume}>Resume</button>;

  return (
    <div>
      {pauseOrResume}
      <button onClick={clear}>Clear</button>
      <button onClick={this.openModal}>Submit</button>
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
