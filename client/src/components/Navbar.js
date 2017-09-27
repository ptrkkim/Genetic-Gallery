import React from 'react';
import { NavLink } from 'react-router-dom';
import { navbar, inactive, active, header, titleBox, genetic, gallery, linkBox } from './styles/navbar.css';

export default () => (
  <nav className={navbar}>
    <div className={linkBox}>
      <NavLink to="/" exact className={inactive} activeClassName={active}>
        <div className={titleBox}>
          <h2 className={genetic}>GENETIC</h2>
          <h2 className={gallery}>GALLERY</h2>
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
    </div>
  </nav>
);
