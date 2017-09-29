import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ControlContainer from './ControlContainer';
// import SubmissionContainer from './SubmissionContainer';
import Canvases from '../components/Canvases';
import { Population } from '../algorithm/population';
import { makeCanvases, getContexts, makeTicker } from './utils';
import { setTicker, setPop, setImages } from '../reducers/create';
import { container } from './styles/create.css';

class CreateContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      size: 50,
      polygonsPer: 75,
      numVertices: 3,
      crossoverChance: 0.3,
      mutateChance: 0.01,
      mutateAmount: 0.1,
    };
  }

  componentDidMount () {
    const ogImage = new Image();
    ogImage.src = this.props.originalSrc;
    ogImage.onload = () => {
      const ogCtx = this.imgCanvas.getContext('2d');
      // scale image to 300 x 300
      ogCtx.drawImage(ogImage, 0, 0, ogImage.width, ogImage.height, 0, 0, 300, 300);
    };

    if (this.props.artSrc) {
      const artImg = new Image();
      artImg.src = this.props.artSrc;
      artImg.onload = () => {
        const outCtx = this.outCanvas.getContext('2d');
        outCtx.drawImage(artImg, 0, 0, artImg.width, artImg.height, 0, 0, 300, 300);
      };
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.originalSrc !== this.props.originalSrc) {
      const newImg = new Image();
      newImg.src = this.props.originalSrc;
      newImg.onload = () => {
        const imgCtx = this.imgCanvas.getContext('2d');
        const outCtx = this.outCanvas.getContext('2d');
        imgCtx.clearRect(0, 0, 300, 300);
        outCtx.clearRect(0, 0, 300, 300);
        imgCtx.drawImage(newImg, 0, 0, newImg.width, newImg.height, 0, 0, 300, 300);
      };
    }
  }

  componentWillUnmount () {
    this.setModalImages(); // save evolution state when navigating away
    clearInterval(this.interval);
    this.interval = null;
    this.props.setTicker(null);
  }

  setModalImages = () => {
    const originalSrc = this.imgCanvas.toDataURL();
    const artSrc = this.outCanvas.toDataURL();

    this.props.setImages(originalSrc, artSrc);
  }

  startEvolution = (oldPopulation) => {
    // for performant offscreen rendering/fitness calculation
    const fullResolution = 300;
    const fitResolution = 125; // hardcode resolution to 125 x 125 for fast calculations

    const [refCanvas, fitCanvas, offCanvas] = makeCanvases(fitResolution, fullResolution);
    const [refCtx, fitCtx, offCtx] = getContexts([refCanvas, fitCanvas, offCanvas]);
    const outCtx = this.outCanvas.getContext('2d');

    // prep offscreen reference canvas for use in fitness calculations
    // downscale so we don't have as many pixels to check- increase speed, decrease 'accuracy'
    refCtx.drawImage(this.imgCanvas, 0, 0, 300, 300, 0, 0, fitResolution, fitResolution);

    const population = oldPopulation || new Population(
      this.state.size,
      this.state.polygonsPer,
      this.state.numVertices,
      this.state.crossoverChance,
      this.state.mutateChance,
      this.state.mutateAmount,
      refCtx,
      fitCtx,
      outCtx,
      fitResolution,
    );

    // reset canvas contexts, old refs may have been unmounted
    if (oldPopulation) {
      population.refCtx = refCtx;
      population.fitCtx = fitCtx;
      population.outCtx = outCtx;
    }

    population.getFittest().draw(outCtx);
    const ticker = makeTicker(population, offCanvas, outCtx, offCtx, fullResolution);

    this.interval = setInterval(ticker, 0);

    // save these to store, so we can access them when navigating away and back
    this.props.setTicker(ticker);
    this.props.setPop(population);
    // this.setState({ ticker }, () => {
    //   this.interval = setInterval(this.state.ticker, 0);
    // });
  }

  resumeEvolution = () => {
    console.log('TICKER!', this.props.ticker);
    console.log('population!', this.props.population);
    if (this.props.ticker) {
      this.interval = setInterval(this.props.ticker, 0);
    } else {
      this.startEvolution(this.props.population);
    }
  }

  pauseEvolution = () => {
    clearInterval(this.interval);
  }

  clearEvolution = () => {
    clearInterval(this.interval);
    this.interval = null;

    this.props.setTicker(null);
    this.props.setPop(null);
    this.props.setImages(this.props.originalSrc, '');
    const outCtx = this.outCanvas.getContext('2d');
    outCtx.clearRect(0, 0, 300, 300);
  }

  handleUpload = (event) => {
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onload = (upload) => {
      this.props.setImages(upload.target.result, '');
      // this.setState({ imageData: upload.target.result });
    };

    if (file) {
      this.props.setTicker(null);
      this.props.setPop(null);
      clearInterval(this.interval);
      reader.readAsDataURL(file);
    }
  }

  render () {
    return (
      <div className={container}>
        <ControlContainer
          population={this.props.population}
          startEvo={this.startEvolution}
          pauseEvo={this.pauseEvolution}
          resumeEvo={this.resumeEvolution}
          clearEvo={this.clearEvolution}
          setModalImages={this.setModalImages}
          originalSrc={this.props.originalSrc}
          artSrc={this.props.artSrc}
        />
        <Canvases
          imgRefSetter={(imgCanvas) => { this.imgCanvas = imgCanvas; }}
          outRefSetter={(outCanvas) => { this.outCanvas = outCanvas; }}
          handleUpload={this.handleUpload}
        />
      </div>
    );
  }
}

CreateContainer.defaultProps = {
  ticker: null,
  population: null,
};

CreateContainer.propTypes = {
  ticker: PropTypes.func,
  population: PropTypes.object, // eslint-disable-line
  originalSrc: PropTypes.string.isRequired,
  artSrc: PropTypes.string.isRequired,
  setTicker: PropTypes.func.isRequired,
  setPop: PropTypes.func.isRequired,
  setImages: PropTypes.func.isRequired,
};

const mapStateToProps = ({ create }) => ({
  ticker: create.ticker,
  population: create.population,
  originalSrc: create.originalSrc,
  artSrc: create.artSrc,
});

const mapDispatchToProps = {
  setTicker,
  setPop,
  setImages,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateContainer);
