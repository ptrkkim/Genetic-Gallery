import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../logo.svg';

const linkContainerStyle = {
  display: 'flex',
  justifyContent: 'space-evenly',
};

const activeLinkStyle = {
  fontWeight: 'bold',
};

export default () => (
  <div className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <div style={linkContainerStyle}>
      <NavLink to="/" activeStyle={activeLinkStyle}><h2>View</h2></NavLink>
      <NavLink to="/create" activeStyle={activeLinkStyle}><h2>Create</h2></NavLink>
      <NavLink to="/learn" activeStyle={activeLinkStyle}><h2>Learn</h2></NavLink>
    </div>
  </div>
);
