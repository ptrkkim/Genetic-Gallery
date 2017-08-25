import React from 'react';
import PropTypes from 'prop-types';
import withHover from '../HOCs/withHover';
import CameraSVG from './CameraSVG';

const inputStyle = {
  display: 'none',
};

const containerStyle = {
  display: 'flex',
  cursor: 'pointer',
};

const overlayStyle = {
  backgroundColor: 'black',
  width: '300px',
  height: '300px',
  cursor: 'pointer',
  margin: '-319px 0px 0px 15px',
  zIndex: '1',
  opacity: '0.92',
};

const canvasStyle = {
  border: '5px solid #222',
  margin: '10px',
};

const ImgCanvas = ({ imgRefSetter, handleUpload, toggleHover, hover }) => {
  const width = 300;
  const height = 300;

  const camera = <CameraSVG />;
  const uploadOverlay = hover
    ? <div id="uploadOverlay" style={overlayStyle}>{camera}</div>
    : null;

  return (
    <div
      style={containerStyle}
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
        {uploadOverlay}
      </label>
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
