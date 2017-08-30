import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PauseResumeClear from '../components/PauseResumeClear';
import SubmitModal from '../components/SubmitModal';
import { container } from './styles/controlContainer.css';

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
    const { clearEvo, ticker, originalBlob, artBlob } = this.props;
    const modal = (
      <SubmitModal
        originalBlob={originalBlob}
        artBlob={artBlob}
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
      : <button onClick={this.start}>Start</button>;

    return (
      <div className={container}>
        {this.state.showModal ? modal : null}
        {startOrPauseResumeClear}
        <button onClick={this.openModal}>Submit</button>
      </div>
    );
  }
}

ControlContainer.defaultProps = {
  ticker: null,
  originalBlob: null,
  artBlob: null,
};

ControlContainer.propTypes = {
  startEvo: PropTypes.func.isRequired,
  pauseEvo: PropTypes.func.isRequired,
  resumeEvo: PropTypes.func.isRequired,
  clearEvo: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  ticker: PropTypes.func,
  originalBlob: PropTypes.object, // eslint-disable-line
  artBlob: PropTypes.object, // eslint-disable-line
};
