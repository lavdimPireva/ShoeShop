import React, { useState } from "react";
import NavbarBrand from "../Navbar/NavbarBrand";

const CheckoutNavBar = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleBurgerMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <nav
      className="navbar is-white has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <NavbarBrand isActive={isActive} toggleBurgerMenu={toggleBurgerMenu} />
      <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
        <div
          className="level"
          style={{ width: "100%", padding: "0 1rem" }}
        ></div>
      </div>
    </nav>
  );
};

export default CheckoutNavBar;
