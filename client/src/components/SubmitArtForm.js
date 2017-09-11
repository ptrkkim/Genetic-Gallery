import React from 'react';
import PropTypes from 'prop-types';

// artist/title code commented out for now, not essential for MVP
const SubmitArtForm = (props) => {
  const {
    // handleArtist,
    // handleTitle,
    handleSubmit,
    // titleValue,
    // artistValue,
  } = props;

  return (
    <div>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

SubmitArtForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  // handleArtist: PropTypes.func.isRequired,
  // handleTitle: PropTypes.func.isRequired,
  // titleValue: PropTypes.string.isRequired,
  // artistValue: PropTypes.string.isRequired,
};

export default SubmitArtForm;
