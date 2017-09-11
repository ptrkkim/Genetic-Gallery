import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PauseResumeClear from '../components/PauseResumeClear';
import SubmitModal from './SubmitModal';
import { container } from './styles/control.css';
import { showModal, hideModal } from '../reducers/modal';

class ControlContainer extends Component {
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

  openModal = () => {
    this.props.setModalImages();
    this.props.showModal();
  }

  render () {
    const { show, clearEvo, ticker, originalSrc, artSrc } = this.props;
    const modal = (
      <SubmitModal
        originalSrc={originalSrc}
        artSrc={artSrc}
        closeModal={this.props.hideModal}
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
        {show ? modal : null}
        {startOrPauseResumeClear}
        <button onClick={this.openModal}>Submit</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({ show: state.modal.show });
const mapDispatchToProps = { showModal, hideModal };

export default connect(mapStateToProps, mapDispatchToProps)(ControlContainer);

ControlContainer.defaultProps = {
  ticker: null,
};

ControlContainer.propTypes = {
  startEvo: PropTypes.func.isRequired,
  pauseEvo: PropTypes.func.isRequired,
  resumeEvo: PropTypes.func.isRequired,
  clearEvo: PropTypes.func.isRequired,
  setModalImages: PropTypes.func.isRequired,
  originalSrc: PropTypes.string.isRequired,
  artSrc: PropTypes.string.isRequired,
  ticker: PropTypes.func,
  showModal: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};
