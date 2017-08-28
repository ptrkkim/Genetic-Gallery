import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImgCanvas from './ImgCanvas';
import s from './styles/canvases.css';

class Canvases extends Component {
  render () {
    const width = '300';
    const height = '300';
    const { outRefSetter, imgRefSetter, handleUpload } = this.props;

    return (
      <div className={s.container} >
        <ImgCanvas
          imgRefSetter={imgRefSetter}
          handleUpload={handleUpload}
        />
        <div>
          <canvas
            className={s.canvas}
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
