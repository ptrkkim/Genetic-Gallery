import React, { Component } from 'react';
import EvolutionContainer from './EvolutionContainer';
import Canvases from '../components/Canvases';
import { Population } from '../algorithm/population';
import { makeCanvases, getContexts, makeTick } from './utils';
import fullstackLogo from '../images/fullstack.png';

export default class CreateContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      size: 50,
      polygonsPer: 125,
      numVertices: 3,
      crossoverChance: 0.3,
      mutateChance: 0.01,
      mutateAmount: 0.1,
      imageData: fullstackLogo,
    };
  }

  componentDidMount () {
    const ogImage = new Image();
    ogImage.src = fullstackLogo;
    ogImage.onload = () => {
      const ogCtx = this.imgCanvas.getContext('2d');
      ogCtx.drawImage(ogImage, 0, 0, 500, 500, 0, 0, 300, 300);
    };
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.imageData !== this.state.imageData) {
      const newImg = new Image();
      newImg.src = this.state.imageData;
      newImg.onload = () => {
        const imgCtx = this.imgCanvas.getContext('2d');
        const outCtx = this.outCanvas.getContext('2d');
        imgCtx.clearRect(0, 0, 300, 300);
        outCtx.clearRect(0, 0, 300, 300);
        imgCtx.drawImage(newImg, 0, 0, newImg.width, newImg.height, 0, 0, 300, 300);
      };
    }
  }

  startEvolution = () => {
    // for performant offscreen rendering/fitness calculation
    const fullResolution = 300;
    const fitResolution = 75;

    const [refCanvas, fitCanvas, offCanvas] = makeCanvases(fitResolution, fullResolution);
    const [refCtx, fitCtx, offCtx] = getContexts([refCanvas, fitCanvas, offCanvas]);
    const outCtx = this.outCanvas.getContext('2d');

    // prep offscreen reference canvas for use in fitness calculations
    // hardcode resolution to 75 x 75 for fast calculations
    refCtx.drawImage(this.imgCanvas, 0, 0, 300, 300, 0, 0, 75, 75);

    const population = new Population(
      this.state.size,
      this.state.polygonsPer,
      this.state.numVertices,
      this.state.crossoverChance,
      this.state.mutateChance,
      this.state.mutateAmount,
      refCtx,
      fitCtx,
      outCtx,
    );

    population.getFittest().draw(outCtx);
    const tick = makeTick(population, offCanvas, outCtx, offCtx, fullResolution);

    this.interval = setInterval(tick, 0);
  }

  stopEvolution = () => {
    this.setState({ numVertices: 3 });
    clearInterval(this.interval);
  }

  handleUpload = (event) => {
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onload = (upload) => {
      this.setState({ imageData: upload.target.result });
    };

    if (file) {
      clearInterval(this.interval);
      reader.readAsDataURL(file);
    }
  }

  render () {
    return (
      <div>
        <Canvases
          imgRefSetter={(imgCanvas) => { this.imgCanvas = imgCanvas; }}
          outRefSetter={(outCanvas) => { this.outCanvas = outCanvas; }}
          handleUpload={this.handleUpload}
        />
        <EvolutionContainer
          startEvolution={this.startEvolution}
          stopEvolution={this.stopEvolution}
        />
      </div>
    );
  }
}
