import React, { useEffect, useState } from "react";
import logo from "../img/atletja1.svg";

const CheckoutNavBar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      role="navigation"
      aria-label="main navigation"
      style={{
        textAlign: isMobile ? "center" : "left",
        width: "100%",
        margin: "0",
        padding: "0",
      }}
    >
      <a className="navbar-item" href="/" style={{ margin: "0", padding: "0" }}>
        <img
          src={logo}
          alt="Logo"
          style={{
            maxHeight: "85px",
            padding: "10px",
            display: "block", // Makes the image a block element to respect textAlign
            margin: "0 auto", // Additional centering for block elements
          }} // Adjust the size as needed
        />
      </a>
    </nav>
  );
};

export default CheckoutNavBar;
