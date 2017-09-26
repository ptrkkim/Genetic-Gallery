import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PauseResumeClear from '../components/PauseResumeClear';
import SubmitModal from './SubmitModal';
import { container } from './styles/control.css';
import { startBtn } from './styles/buttons.css';

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

  render () {
    const { clearEvo, ticker, originalSrc, artSrc } = this.props;

    const instructions = `This is where I tell you how to use the app. Press buttons to do stuff and press other buttons to do other things. Haha genetic algorithms`; // eslint-disable-line 

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
        clear={clearEvo}
      />
    );

    const startOrPauseResumeClear = ticker
      ? prcComponent
      : <button className={startBtn} onClick={this.start}>Start</button>;

    return (
      <div className={container}>
        <p>{instructions}</p>
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
