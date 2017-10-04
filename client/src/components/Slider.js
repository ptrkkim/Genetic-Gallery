import React from 'react';
import PropTypes from 'prop-types';
import { container, text, slider, val } from './styles/slider.css';

const types = {
  size: {
    label: 'Population',
    min: 5,
    max: 100,
    step: 1,
    caption: '',
  },
  polygonsPer: {
    label: 'Polygons',
    min: 1,
    max: 300,
    step: 1,
    caption: '',
  },
  numVertices: {
    label: 'Vertices',
    min: 3,
    max: 10,
    step: 1,
    caption: '',
  },
  crossoverChance: {
    label: 'Crossover Chance',
    min: 0,
    max: 1,
    step: 0.1,
    caption: '',
  },
  mutateChance: {
    label: 'Mutation Chance',
    min: 0,
    max: 0.5,
    step: 0.01,
    caption: '',
  },
  mutateAmount: {
    label: 'Mutation Amount',
    min: 0,
    max: 1,
    step: 0.01,
    caption: '',
  },
};

const Slider = ({ param, value, handleChange }) => {
  const { label, min, max, step /* , caption */} = types[param];

  return (
    <div className={container}>
      <div className={text}>{label}</div>
      <span className={val}>{value}</span>
      &nbsp;
      <input
        className={slider}
        type="range"
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
      />
    </div>
  );
};

Slider.propTypes = {
  param: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Slider;
