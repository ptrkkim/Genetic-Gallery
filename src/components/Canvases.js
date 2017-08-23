import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImgCanvas from './ImgCanvas';

class Canvases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };
  }

  toggleHover = () => {
    console.log('hover toggled');
    this.setState({ hover: !this.state.hover });
  }

  render () {
    const width = '300';
    const height = '300';

    const containerStyle = {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
    };
    const canvasStyle = {
      border: '5px solid #222',
      margin: '10px',
    };

    const { outRefSetter, imgRefSetter, handleUpload } = this.props;
    return (
      <div style={containerStyle} >
        <ImgCanvas
          imgRefSetter={imgRefSetter}
          handleUpload={handleUpload}
        />
        <div>
          <canvas
            id="outCanvas"
            width={width}
            height={height}
            style={canvasStyle}
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
