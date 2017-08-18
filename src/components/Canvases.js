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
    const ogImage = new Image();
    ogImage.src = fullstackLogo;
    ogImage.onload = () => {
      const ogCtx = this.originalCanvas.getContext('2d');
      ogCtx.drawImage(ogImage, 0, 0, 500, 500, 0, 0, 300, 300);
    };
  }

  startEvolution () {
    const size = 50;
    const polygonsPer = 75;
    const numVertices = 3;
    const crossoverChance = 0.3;
    const mutateChance = 0.01;
    const mutateAmount = 0.1;

    // for performant offscreen rendering/fitness calculation
    const fullResolution = 300;
    const fitResolution = 75;

    const refCanvas = document.createElement('canvas');
    refCanvas.width = `${fitResolution}`;
    refCanvas.width = `${fitResolution}`;

    const fitCanvas = document.createElement('canvas');
    fitCanvas.width = `${fitResolution}`;
    fitCanvas.height = `${fitResolution}`;

    const fitCtx = fitCanvas.getContext('2d');
    const refCtx = refCanvas.getContext('2d');
    const outCtx = this.outCanvas.getContext('2d');

    // hardcode resolution to 75 x 75 for fast fit calcs
    refCtx.drawImage(this.originalCanvas, 0, 0, 300, 300, 0, 0, 75, 75);

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

    population.getFittest().draw(outCtx);

    const tick = () => {
      outCtx.clearRect(0, 0, fullResolution, fullResolution);
      population.createNextGen();
      const fittest = population.getFittest();
      // console.log(fittest.calcFitness(refCtx, fitCtx, fitResolution));
      fittest.draw(outCtx, fullResolution);
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
            id="originalCanvas"
            width={width}
            height={height}
            style={canvasStyle}
            ref={(originalCanvas) => { this.originalCanvas = originalCanvas; }}
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
