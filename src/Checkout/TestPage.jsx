import React from "react";
import logo from "../img/atletja1.svg";
import { useCart } from "../context/CartProvider";

const TestPage = () => {
  return (
    <div
      style={{
        maxWidth: "600px",
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center",
        marginTop: "40px",
        padding: "20px",
        backgroundColor: "#f2f2f2",
        borderRadius: "5px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ fontSize: "24px", color: "#333", fontWeight: "bold" }}>
        Purchase Confirmation
      </h1>
      <p style={{ fontSize: "16px", color: "#333" }}>Dear Lavdim Pireva,</p>
      <p style={{ fontSize: "16px", color: "#333" }}>
        This is a notification to confirm that your order has been placed
        successfully.
      </p>
      <p style={{ fontSize: "16px", color: "#333" }}>
        For more information about your order or if you have any questions,
        please do not hesitate to contact us at{" "}
        <a href="mailto:info@atletjaime.com">info@atletjaime.com</a>.
      </p>
      <p style={{ fontSize: "16px", color: "#333", marginTop: "20px" }}>
        Thank you for your purchase!
      </p>
    </div>
  );
};

export default TestPage;
