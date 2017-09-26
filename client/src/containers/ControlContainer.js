import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PauseResumeClear from '../components/PauseResumeClear';
import SubmitModal from './SubmitModal';
import { container, title, para } from './styles/control.css';
import { startBtn } from '../styles/buttons.css';

export default class ControlContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      showModal: false,
    };
  }

  start = () => { // weird pattern, but allows state changes in multiple components
    this.props.startEvo();
    this.setState({ isPlaying: true });
  }

  pause = () => {
    this.props.pauseEvo();
    this.setState({ isPlaying: false });
  }

  resume = () => {
    this.props.resumeEvo();
    this.setState({ isPlaying: true });
  }

  openModal = () => {
    this.props.openModal();
    this.setState({ showModal: true });
  }

  closeModal = () => {
    this.setState({ showModal: false });
  }

  submit = () => {
    this.props.pauseEvo();
    this.props.openModal();
    this.setState({
      isPlaying: false,
      showModal: true,
    });
  }

  render () {
    const { clearEvo, ticker, originalSrc, artSrc } = this.props;

    const instructions1 = `Press Start to begin evolving a new, unique approximation of the original image.`; // eslint-disable-line 
    const instructions2 = `Click on the original image to upload your own.`; // eslint-disable-line 

    const modal = (
      <SubmitModal
        originalSrc={originalSrc}
        artSrc={artSrc}
        closeModal={this.closeModal}
      />
    );

    const prcComponent = (
      <PauseResumeClear
        isPlaying={this.state.isPlaying}
        pause={this.pause}
        resume={this.resume}
        submit={this.submit}
        clear={clearEvo}
      />
    );

    const startOrPauseResumeClear = ticker
      ? prcComponent
      : <button className={startBtn} onClick={this.start}>START</button>;

    return (
      <div className={container}>
        <div>
          <h3 className={title}>How do I use this?</h3>
          <p className={para}>{instructions1}</p>
          <p className={para}>{instructions2}</p>
        </div>
        {this.state.showModal ? modal : null}
        {startOrPauseResumeClear}
      </div>
    );
  }
}

ControlContainer.defaultProps = {
  ticker: null,
};

ControlContainer.propTypes = {
  startEvo: PropTypes.func.isRequired,
  pauseEvo: PropTypes.func.isRequired,
  resumeEvo: PropTypes.func.isRequired,
  clearEvo: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  originalSrc: PropTypes.string.isRequired,
  artSrc: PropTypes.string.isRequired,
  ticker: PropTypes.func,
};
