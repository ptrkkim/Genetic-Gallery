import React from 'react';
import { NavLink } from 'react-router-dom';
import { navbar, inactive, active, header, title, thin, closer } from './styles/navbar.css';

export default () => (
  <nav className={navbar}>
    <NavLink to="/" exact className={inactive} activeClassName={active}>
      <div className={title}>
        <h2 className={thin}>GENETIC</h2>
        <h2 className={closer}>GALLERY</h2>
      </div>
    </NavLink>
    <NavLink to="/create" className={inactive} activeClassName={active}>
      <div className={header}>
        <h2>CREATE</h2>
      </div>
    </NavLink>
    <NavLink to="/learn" className={inactive} activeClassName={active}>
      <div className={header}>
        <h2>LEARN</h2>
      </div>
    </NavLink>
  </nav>
);
