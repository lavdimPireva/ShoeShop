import React from "react";
import logo from "../img/atletja1.svg";

const CheckoutNavBar = () => {
  return (
    <nav role="navigation" aria-label="main navigation">
      <a className="navbar-item" href="/">
        <img
          src={logo}
          alt="Logo"
          style={{
            maxHeight: "93px",
            padding: "10px",
          }} // Adjust the size as needed
        />
      </a>
    </nav>
  );
};

export default CheckoutNavBar;
