import React, { Component } from 'react';

export default function withHover (WrappedComponent) {
  return class WithHover extends Component {
    constructor(props) {
      super(props);
      this.state = {
        hover: false,
      };
    }

    toggleHover = () => {
      this.setState({ hover: !this.state.hover });
    }

    render () {
      return (
        <WrappedComponent
          toggleHover={this.toggleHover}
          hover={this.state.hover}
          {...this.props}
        />
      );
    }
  };
}
