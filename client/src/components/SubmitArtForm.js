import React from 'react';
import PropTypes from 'prop-types';

const SubmitArtForm = (props) => {
  const {
    handleArtist,
    handleTitle,
    handleSubmit,
    titleValue,
    artistValue,
  } = props;

  return (
    <div>
      <input onChange={handleTitle} value={titleValue} />
      <input onChange={handleArtist} value={artistValue} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

SubmitArtForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleArtist: PropTypes.func.isRequired,
  handleTitle: PropTypes.func.isRequired,
  titleValue: PropTypes.string.isRequired,
  artistValue: PropTypes.string.isRequired,
};

export default SubmitArtForm;
