import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './styles/navbar.css';

export default () => (
  <div className={s.navbar}>
    <NavLink to="/" className={s.inactive}><h2>View1</h2></NavLink>
    <NavLink to="/create" className={s.inactive}><h2>View2</h2></NavLink>
    <NavLink to="/learn" className={s.inactive}><h2>View3</h2></NavLink>
  </div>
);
