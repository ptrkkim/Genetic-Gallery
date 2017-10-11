import React from 'react';
import PropTypes from 'prop-types';
import { container, text, slider, val, popover } from './styles/slider.css';

const types = {
  size: {
    label: 'Population',
    min: 5,
    max: 100,
    step: 1,
    caption: 'This determines the size of our gene pool. The bigger the pool, the more possible images we are likely to explore- at the cost of calculation speed.',
  },
  polygonsPer: {
    label: 'Polygons',
    min: 1,
    max: 300,
    step: 1,
    caption: 'The number of shapes used per image. More shapes give us more detailed images, but slow down the algorithm.',
  },
  numVertices: {
    label: 'Vertices',
    min: 3,
    max: 10,
    step: 1,
    caption: 'The number of vertices per polygon in our images.',
  },
  crossoverChance: {
    label: 'Crossover Chance',
    min: 0,
    max: 1,
    step: 0.1,
    caption: 'The chance that two parent images create a child, combining their genes. Lower values preserve more parental genes, helping our algorithm converge toward a solution.',
  },
  mutateChance: {
    label: 'Mutation Chance',
    min: 0,
    max: 0.5,
    step: 0.01,
    caption: 'The chance that each of an image\'s polygons will shift in color and position. Keep low to make more incremental changes.',
  },
  mutateAmount: {
    label: 'Mutation Amount',
    min: 0,
    max: 1,
    step: 0.01,
    caption: 'If a polygon mutates, this determines how much its RGBA and coordinate values might change.',
  },
  fitResolution: {
    label: 'Resolution',
    min: 25,
    max: 300,
    step: 5,
    caption: 'Internal resolution for comparing images. Higher resolution gives us more accurate output, but is computationally very expensive.',
  },
};

const Slider = ({ param, value, handleChange }) => {
  const { label, min, max, step, caption } = types[param];

  return (
    <div className={container}>
      <span className={popover}>{caption}</span>
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
