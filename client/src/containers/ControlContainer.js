import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PauseResumeClear from '../components/PauseResumeClear';
import SubmitModal from './SubmitModal';
import { showModal, hideModal } from '../reducers/modal';
import { postOne } from '../reducers/gallery';
import { startBtn } from '../styles/buttons.css';
import { container, title, para } from './styles/control.css';

class ControlContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
    };
  }

  start = () => { // weird pattern, but allows state changes in multiple components
    this.props.startEvo(this.props.population);
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

  submit = () => {
    this.props.pauseEvo();
    this.props.setModalImages();
    this.props.showModal();
    this.setState({
      isPlaying: false,
    });
  }

  render () {
    const { show, clearEvo, population, originalSrc, artSrc } = this.props;

    const instructions1 = `Press Start to begin evolving a new, unique approximation of the original image.`; // eslint-disable-line 
    const instructions2 = `Click on the original image to upload your own.`; // eslint-disable-line 

    const modal = (
      <SubmitModal
        originalSrc={originalSrc}
        artSrc={artSrc}
        closeModal={this.props.hideModal}
        postOne={this.props.postOne}
      />
    );

    const pauseResumeClear = (
      <PauseResumeClear
        isPlaying={this.state.isPlaying}
        pause={this.pause}
        resume={this.resume}
        submit={this.submit}
        clear={clearEvo}
      />
    );

    const startOrPauseResumeClear = population
      ? pauseResumeClear
      : <button className={startBtn} onClick={this.start}>START</button>;

    return (
      <div className={container}>
        <div>
          <h3 className={title}>How do I use this?</h3>
          <p className={para}>{instructions1}</p>
          <p className={para}>{instructions2}</p>
        </div>
        {show ? modal : null}
        {startOrPauseResumeClear}
      </div>
    );
  }
}

const mapStateToProps = state => ({ show: state.modal.show });
const mapDispatchToProps = { showModal, hideModal, postOne };

export default connect(mapStateToProps, mapDispatchToProps)(ControlContainer);

ControlContainer.defaultProps = {
  population: null,
};

ControlContainer.propTypes = {
  population: PropTypes.object, // eslint-disable-line
  startEvo: PropTypes.func.isRequired,
  pauseEvo: PropTypes.func.isRequired,
  resumeEvo: PropTypes.func.isRequired,
  clearEvo: PropTypes.func.isRequired,
  setModalImages: PropTypes.func.isRequired,
  originalSrc: PropTypes.string.isRequired,
  artSrc: PropTypes.string.isRequired,
  showModal: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  postOne: PropTypes.func.isRequired,
};
