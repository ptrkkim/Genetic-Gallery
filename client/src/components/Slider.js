import React from 'react';
import PropTypes from 'prop-types';

const types = {
  size: {
    label: 'Size',
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
  const { name, min, max, step /* , caption */} = types[param];

  return (
    <div>
      <h5>{name}</h5>
      <input
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
