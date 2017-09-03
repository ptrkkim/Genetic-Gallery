import React from 'react';
import PropTypes from 'prop-types';
import withHover from '../HOCs/withHover';
import CameraSVG from './CameraSVG';
import { overlay, container, canvasCard, input } from './styles/imgCanvas.css';

// for displaying and uploading original reference images
const ImgCanvas = ({ imgRefSetter, handleUpload, startHover, stopHover, hover }) => {
  const width = 300;
  const height = 300;

  const uploadOverlay = hover
    ? <div className={overlay} id="uploadOverlay"><CameraSVG /></div>
    : null;

  return (
    <div className={container} onMouseEnter={startHover} onMouseLeave={stopHover}>
      <label htmlFor="upload">
        <canvas
          className={canvasCard}
          id="originalCanvas"
          width={width}
          height={height}
          ref={imgRefSetter}
        />
        <input
          className={input}
          type="file"
          id="upload"
          accept=".jpg, .jpeg, .png"
          onChange={handleUpload}
        />
        {uploadOverlay}
      </label>
    </div>
  );
};

ImgCanvas.propTypes = {
  imgRefSetter: PropTypes.func.isRequired,
  startHover: PropTypes.func.isRequired,
  stopHover: PropTypes.func.isRequired,
  hover: PropTypes.bool.isRequired,
  handleUpload: PropTypes.func.isRequired,
};

// withHover wraps this component in a component that manages hover state
export default withHover(ImgCanvas);
