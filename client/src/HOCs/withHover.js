import React, { Component } from 'react';

export default function withHover (WrappedComponent) {
  return class WithHover extends Component {
    constructor(props) {
      super(props);
      this.state = {
        hover: false,
      };
    }

    // DO NOT consolidate into toggleHover
    // toggle breaks if mouse enters from another window or modal, then leaves
    startHover = () => {
      this.setState({ hover: true });
    }

    stopHover = () => {
      this.setState({ hover: false });
    }

    render () {
      return (
        <WrappedComponent
          startHover={this.startHover}
          stopHover={this.stopHover}
          hover={this.state.hover}
          {...this.props}
        />
      );
    }
  };
}
