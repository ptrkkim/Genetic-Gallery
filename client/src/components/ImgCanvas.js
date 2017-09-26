import React from 'react';
import PropTypes from 'prop-types';
import CameraSVG from './CameraSVG';
import { overlay, container, canvasCard, input } from './styles/imgCanvas.css';

// for displaying and uploading original reference images
const ImgCanvas = ({ imgRefSetter, handleUpload }) => {
  const width = 300;
  const height = 300;

  const uploadOverlay = <div className={overlay} id="uploadOverlay"><CameraSVG /></div>;

  return (
    <div className={container}>
      <label htmlFor="upload">
        <div className={canvasCard}>
          <canvas

            id="originalCanvas"
            width={width}
            height={height}
            ref={imgRefSetter}
          />
          {uploadOverlay}
        </div>
        <input
          className={input}
          type="file"
          id="upload"
          accept=".jpg, .jpeg, .png"
          onChange={handleUpload}
        />
      </label>
    </div>
  );
};

ImgCanvas.propTypes = {
  imgRefSetter: PropTypes.func.isRequired,
  handleUpload: PropTypes.func.isRequired,
};

// withHover wraps this component in a component that manages hover state
export default ImgCanvas;
