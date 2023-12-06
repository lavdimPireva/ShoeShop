import React, { useState } from "react";

import logo from "../img/atletja1.svg";

const NavbarBrand = ({ isActive, toggleBurgerMenu }) => (
  <div
    className="navbar-brand"
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <a className="navbar-item" href="/">
      <img
        src={logo}
        alt="Logo"
        style={{ width: "120px", maxHeight: "100px", padding: "5px" }} // Adjust the size as needed
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
