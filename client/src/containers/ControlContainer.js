import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PauseResumeClear from '../components/PauseResumeClear';
// import SubmitModal from '../components/SubmitModal';

export default class ControlContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
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

  render () {
    const { clearEvo, ticker } = this.props;
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

    const btnContainer = { display: 'flex', justifyContent: 'center' };
    return (
      <div style={btnContainer}>
        {/* <SubmitModal /> */}
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
  ticker: PropTypes.func,
};
