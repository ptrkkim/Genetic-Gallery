import React from 'react';
import { NavLink } from 'react-router-dom';

// const linkContainerStyle = {
//   display: 'flex',
//   justifyContent: 'space-evenly',
// };

const inactiveStyle = {
  fontWeight: 'bold',
  textDecoration: 'none',
  color: '#222',
};

export default () => (
  <div className="App-header">
    <NavLink to="/" style={inactiveStyle}><h2>View1</h2></NavLink>
    <NavLink to="/create" style={inactiveStyle}><h2>View2</h2></NavLink>
    <NavLink to="/learn" style={inactiveStyle}><h2>View3</h2></NavLink>
  </div>
);
