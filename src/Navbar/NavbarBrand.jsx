import React, { useState } from "react";

import logo from "../img/atletja.jpg";

const NavbarBrand = ({ isActive, toggleBurgerMenu }) => (
  <div className="navbar-brand">
    <a className="navbar-item" href="/">
      <img
        src={logo}
        alt="Logo"
        style={{ maxHeight: "100px", padding: "5px" }}
      />
    </a>
    <a
      role="button"
      className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
      aria-label="menu"
      aria-expanded="false"
      onClick={toggleBurgerMenu}
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>
);

export default NavbarBrand;
