import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImgCanvas from './ImgCanvas';
import { container, canvasCard } from './styles/canvases.css';

class Canvases extends Component {
  render () {
    const width = '300';
    const height = '300';
    const { outRefSetter, imgRefSetter, handleUpload } = this.props;

    return (
      <div className={container} >
        <ImgCanvas
          imgRefSetter={imgRefSetter}
          handleUpload={handleUpload}
        />
        <div>
          <canvas
            className={canvasCard}
            id="outCanvas"
            width={width}
            height={height}
            ref={outRefSetter}
          />
        </div>
      </div>
    );
  }
}

Canvases.propTypes = {
  imgRefSetter: PropTypes.func.isRequired,
  outRefSetter: PropTypes.func.isRequired,
  handleUpload: PropTypes.func.isRequired,
};

export default Canvases;
