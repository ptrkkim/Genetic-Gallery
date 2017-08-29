import React from 'react';
import PropTypes from 'prop-types';
import withHover from '../HOCs/withHover';
import CameraSVG from './CameraSVG';
import { overlay, container, canvasCard, input } from './styles/imgCanvas.css';

const ImgCanvas = ({ imgRefSetter, handleUpload, toggleHover, hover }) => {
  const width = 300;
  const height = 300;

  const camera = <CameraSVG />;
  const uploadOverlay = hover
    ? <div className={overlay} id="uploadOverlay">{camera}</div>
    : null;

  return (
    <div className={container} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
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
  toggleHover: PropTypes.func.isRequired,
  hover: PropTypes.bool.isRequired,
  handleUpload: PropTypes.func.isRequired,
};

export default withHover(ImgCanvas);
