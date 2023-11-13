import React, { useState } from "react";
import NavbarBrand from "./NavbarBrand";
import SearchBar from "./SearchBar";
import NavLinks from "./NavLinks";
import Breadcrumbs from "./Breadcrumbs";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleBurgerMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <nav
        className="navbar is-white has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <NavbarBrand isActive={isActive} toggleBurgerMenu={toggleBurgerMenu} />
        <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
          <div className="level" style={{ width: "100%", padding: "0 1rem" }}>
            <SearchBar />
            <NavLinks />
          </div>
        </div>
      </nav>
      <Breadcrumbs />
    </>
  );
};

export default Navbar;
