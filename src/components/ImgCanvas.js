import React from 'react';
import PropTypes from 'prop-types';
import withHover from '../HOCs/withHover';

const inputStyle = {
  display: 'none',
};

const zFlexStyle = {
  display: 'flex',
};

const overlayStyle = {
  backgroundColor: 'black',
  width: '300px',
  height: '300px',
  margin: '10px 10px 10px -320px',
  border: '5px solid rgb(34, 34, 34)',
  zIndex: 1,
};

const canvasStyle = {
  border: '5px solid #222',
  margin: '10px',
};

const ImgCanvas = ({ imgRefSetter, toggleHover, hover, handleUpload }) => {
  const width = 300;
  const height = 300;

  const uploadOverlay = hover
    ? <div id="uploadOverlay" style={overlayStyle} />
    : null;

  return (
    <div
      style={zFlexStyle}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
    >
      <label
        htmlFor="upload"
      >
        <canvas
          id="originalCanvas"
          width={width}
          height={height}
          style={canvasStyle}
          ref={imgRefSetter}
        />
        <input
          type="file"
          id="upload"
          accept=".jpg, .jpeg, .png"
          onChange={handleUpload}
          style={inputStyle}
        />
      </label>
      {uploadOverlay}
    </div>
  );
};

ImgCanvas.propTypes = {
  imgRefSetter: PropTypes.func.isRequired,
  toggleHover: PropTypes.func.isRequired,
  hover: PropTypes.bool.isRequired,
  handleUpload: PropTypes.func.isRequired,
};

export default withHover(ImgCanvas);
