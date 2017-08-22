import React, { Component } from 'react';
// import { Population } from '../algorithm/population';
/* eslint-disable */
export default class EvolutionContainer extends Component {
  render () {
    return (
      <div>
        <button onClick={this.props.startEvolution}>Start</button>
        <button onClick={this.props.stopEvolution}>Stop</button>
      </div>
    );
  }
}
