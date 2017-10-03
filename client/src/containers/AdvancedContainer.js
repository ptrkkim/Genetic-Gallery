import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Slider from '../components/Slider';
import { setSize, setPolygons, setVertices, setCrossover, setMutaChance, setMutaAmount } from '../reducers/advanced';
import { container } from './styles/advanced.css';
// form/slider params put in redux, not local state
// because i want them to persist even when component unmounts
class AdvancedContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  toggle = () => {
    this.setState({ show: !this.state.show });
  }

  render () {
    const params = {
      size: this.props.setSize,
      polygonsPer: this.props.setPolygons,
      numVertices: this.props.setVertices,
      crossoverChance: this.props.setCrossover,
      mutateChance: this.props.setMutaChance,
      mutateAmount: this.props.setMutaAmount,
    };

    return (
      <div className={container}>
        <button type="button" onClick={this.toggle}>ADVANCED</button>
        {
          this.state.show &&
          Object.keys(params).map(param =>
            (<Slider
              param={param}
              value={this.props[param]}
              handleChange={evt => params[param](evt.target.value)}
            />))
        }
      </div>
    );
  }
}

AdvancedContainer.propTypes = { // proptypes can't tell i'm accessing these via a param variable :(
  size: PropTypes.number.isRequired, // eslint-disable-line
  polygonsPer: PropTypes.number.isRequired, // eslint-disable-line
  numVertices: PropTypes.number.isRequired, // eslint-disable-line
  crossoverChance: PropTypes.number.isRequired, // eslint-disable-line
  mutateChance: PropTypes.number.isRequired, // eslint-disable-line
  mutateAmount: PropTypes.number.isRequired, // eslint-disable-line
  setSize: PropTypes.func.isRequired,
  setPolygons: PropTypes.func.isRequired,
  setVertices: PropTypes.func.isRequired,
  setCrossover: PropTypes.func.isRequired,
  setMutaChance: PropTypes.func.isRequired,
  setMutaAmount: PropTypes.func.isRequired,
};

const mapStateToProps = ({ advanced }) => ({
  size: advanced.size,
  polygonsPer: advanced.polygonsPer,
  numVertices: advanced.numVertices,
  crossoverChance: advanced.crossoverChance,
  mutateChance: advanced.mutateChance,
  mutateAmount: advanced.mutateAmount,
});

const mapDispatchToProps = {
  setSize,
  setPolygons,
  setVertices,
  setCrossover,
  setMutaChance,
  setMutaAmount,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedContainer);
