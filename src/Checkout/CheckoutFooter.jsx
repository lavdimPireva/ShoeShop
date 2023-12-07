import React from "react";
import paypalIcon from "../img/paypal.svg"; // Update with the path to your PayPal icon
import cardIcon from "../img/credit-card.png"; // Update with the path to your card icon

const CheckoutFooter = ({ total, onNextStepClick }) => {
  return (
    <div
      className="footer-container"
      style={{
        marginTop: "10px",
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
      }}
    >
      {/* Payment icons container */}
      <div
        style={{
          marginLeft: "30px",
          display: "flex",
          alignItems: "center",
          gap: "35px",
        }}
      >
        <img
          src={paypalIcon}
          alt="PayPal"
          style={{ maxHeight: "150px", maxWidth: "100px" }} // Adjust size as needed
        />
        <img
          src={cardIcon}
          alt="Debit or Credit Card"
          style={{ maxHeight: "50px", maxWidth: "120px" }} // Adjust size as needed
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
        }}
      >
        <div
          style={{
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Total: {total} €
        </div>
        <button
          className="button is-normal has-text-weight-medium"
          style={{
            backgroundColor: "#1975B5",
            color: "#fff",
            padding: "10px 30px", // Increase padding to make the button bigger
            fontSize: "18px", // Increase font size if necessary
            display: "flex",
            alignItems: "center",
            gap: "8px", // This adds space between the icon and the text within the button
          }}
          onClick={onNextStepClick}
        >
          {/* Adjust the icon size if needed */}
          Continue
        </button>
      </div>
    </div>
  );
};

export default CheckoutFooter;
