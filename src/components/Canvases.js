import React from 'react';

const Canvases = () => {
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

  return (
    <div style={containerStyle} >
      <canvas id="refCanvas" width={width} height={height} style={canvasStyle} />
      <canvas id="fitCanvas" width={width} height={height} style={canvasStyle} />
      <canvas id="outCanvas" width={width} height={height} style={canvasStyle} />
    </div>
  );
};

export default Canvases;
