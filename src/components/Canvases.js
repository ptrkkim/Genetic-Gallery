import React, { Component } from 'react';
import { Population } from '../algorithm/population';
import fullstackLogo from '../images/fullstack.png';

class Canvases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
    };

    this.startEvolution = this.startEvolution.bind(this);
    this.stopEvolution = this.stopEvolution.bind(this);
  }

  componentDidMount () {
    const testImage = new Image();
    testImage.src = fullstackLogo;
    testImage.onload = () => {
      const refCtx = this.refCanvas.getContext('2d');
      refCtx.drawImage(testImage, 0, 0, 500, 500, 0, 0, 300, 300);
    };
  }

  startEvolution () {
    const size = 20;
    const polygonsPer = 50;
    const numVertices = 3;
    const crossoverChance = 0.3;
    const mutateChance = 0.01;
    const mutateAmount = 0.1;

    // for performant offscreen rendering/fitness calculation
    const fullWidth = 300;
    const fullHeight = 300;
    const fitWidth = 75;
    const fitHeight = 75;
    const fitCanvas = document.createElement('canvas');
    fitCanvas.width = `${fitWidth}px`;
    fitCanvas.height = `${fitHeight}px`;

    const fitCtx = fitCanvas.getContext('2d');
    const refCtx = this.refCanvas.getContext('2d');
    const outCtx = this.outCanvas.getContext('2d');

    const population = new Population(
      size,
      polygonsPer,
      numVertices,
      crossoverChance,
      mutateChance,
      mutateAmount,
      refCtx,
      fitCtx,
      outCtx,
    );

    console.log(population.getFittest());
    population.getFittest().draw(outCtx);

    const tick = () => {
      outCtx.clearRect(0, 0, fullWidth, fullHeight);
      population.createNextGen();
      population.getFittest().draw(outCtx);
    };

    this.interval = setInterval(tick, 0);
  }

  stopEvolution () {
    clearInterval(this.interval);
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

    return (
      <div>
        <div style={containerStyle} >
          <canvas
            id="refCanvas"
            width={width}
            height={height}
            style={canvasStyle}
            ref={(refCanvas) => { this.refCanvas = refCanvas; }}
          />
          <canvas
            id="outCanvas"
            width={width}
            height={height}
            style={canvasStyle}
            ref={(outCanvas) => { this.outCanvas = outCanvas; }}
          />
        </div>
        <div>
          <button onClick={this.startEvolution}>Start</button>
          <button onClick={this.stopEvolution}>Stop</button>
        </div>
      </div>
    );
  }
}

export default Canvases;
