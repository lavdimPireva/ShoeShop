import React, { useState } from "react";
import NavbarBrand from "../Navbar/NavbarBrand";
import logo from "../img/atletja1.svg";

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
      <a className="navbar-item" href="/">
        <img
          src={logo}
          alt="Logo"
          style={{
            maxHeight: "93px",
            padding: "10px",
            textAlign: "center",
            width: "100%",
          }} // Adjust the size as needed
        />
      </a>
    </nav>
  );
};

export default CheckoutNavBar;
