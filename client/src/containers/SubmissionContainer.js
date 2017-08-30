import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SubmitModal from '../components/SubmitModal';


class SubmissionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  render() {
    const { originalBlob, artBlob } = this.props;
    return (
      <SubmitModal
        originalBlob={originalBlob}
        artBlob={artBlob}
      />
    );
  }
}

SubmissionContainer.propTypes = {
  originalBlob: PropTypes.object.isRequired, // eslint-disable-line
  artBlob: PropTypes.object.isrequired, // eslint-disable-line
};

export default SubmissionContainer;
