import React from 'react';

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

const Canvases = ({ imgRefSetter, outRefSetter, handleUpload }) => ( // eslint-disable-line
  <div style={containerStyle} >
    <input
      type="file"
      id="upload"
      accept=".jpg, .jpeg, .png"
      onChange={handleUpload}
    />
    <canvas
      id="originalCanvas"
      width={width}
      height={height}
      style={canvasStyle}
      ref={imgRefSetter}
    />
    <canvas
      id="outCanvas"
      width={width}
      height={height}
      style={canvasStyle}
      ref={outRefSetter}
    />
  </div>
);


export default Canvases;
