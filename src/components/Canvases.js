import React, { Component } from 'react';
import PropTypes from 'prop-types';


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
    const { imgRefSetter, outRefSetter, handleUpload } = this.props;

    const uploadOverlay = this.state.hover
      ? <div id="uploadOverlay" style={overlayStyle} />
      : null;

    return (
      <div style={containerStyle} >
        <div
          style={zFlexStyle}
          onMouseEnter={this.toggleHover}
          onMouseLeave={this.toggleHover}
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
