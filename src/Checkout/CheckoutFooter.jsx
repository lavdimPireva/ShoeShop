import React, { useEffect, useState } from "react";

import paypalIcon from "../img/paypal.svg"; // Update with the path to your PayPal icon
import cardIcon from "../img/credit-card.png"; // Update with the path to your card icon

const CheckoutFooter = ({ total, onNextStepClick }) => {
  const desktopStyle = {
    display: "flex",
    alignItems: "center",
    gap: "35px",
  };

  // Inline styles for mobile
  const mobileStyle = {
    display: "none",
  };

  // Get the window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobileView = windowWidth < 600;

  console.log("window Width", windowWidth);

  return (
    <div
      className="footer-container"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "space-around", // Space out child divs
        alignItems: "center",
        backgroundColor: "#fff",
        zIndex: 1000,
        rowGap: "100px",

        height: isMobileView ? "60px" : "",
      }}
    >
      {/* Payment icons container */}
      <div style={windowWidth > 600 ? desktopStyle : mobileStyle}>
        <img
          src={paypalIcon}
          alt="PayPal"
          style={{ maxHeight: "130px", maxWidth: "130px" }} // Adjust size as needed
        />
        <img
          src={cardIcon}
          alt="Debit or Credit Card"
          style={{ maxHeight: "70px", maxWidth: "70px" }} // Adjust size as needed
        />
      </div>

      {/* Total and button container */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center", // This will center the items horizontally on the page
          margin: "25px",
          gap: "30px", // This adds space between the "Total" label and the button
          width: "100%",
          width: isMobileView ? "100%" : "20%", // On mobile, the button should grow to fill the space
        }}
      >
        {!isMobileView && (
          <div
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              whiteSpace: "nowrap",
            }}
          >
            Total: {total} €
          </div>
        )}

        <button
          className="button is-normal has-text-weight-medium"
          style={{
            backgroundColor: "#1975B5",
            color: "#fff",
            padding: "10px",
            fontSize: "18px",
            width: "100%", // The button will fill the width of the div
          }}
          onClick={onNextStepClick}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default CheckoutFooter;
