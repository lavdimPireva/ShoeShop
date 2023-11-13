import React, { useState } from "react";

const NavLinks = () => (
  <div className="level-right px-2 py-2">
    <a className="level-item navbar-item" href="/">
      Home
    </a>
    <a className="level-item navbar-item" href="/about">
      About
    </a>
    <a className="level-item navbar-item" href="/products">
      Products
    </a>
    {/* ... other navbar items ... */}
  </div>
);

export default NavLinks;
