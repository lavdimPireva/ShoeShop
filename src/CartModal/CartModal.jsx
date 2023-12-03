import React, { useState } from "react";
import "./CartModal.css"; // Make sure to import the CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreditCard,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartProvider";
import { useNavigate } from "react-router-dom";

const CartModal = ({ isCartOpen, closeCart, cartItems }) => {
  const [isClosing, setClosing] = useState(false);

  const { removeFromCart, subtotal } = useCart();

  const navigate = useNavigate();

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      closeCart();
    }, 300);
  };

  const handleCheckout = () => {
    navigate("/checkout"); // This will navigate to the checkout page
  };

  if (!isCartOpen && !isClosing) return null;

  return (
    <>
      <div
        className={`modal-overlay ${
          isCartOpen || isClosing ? "is-active" : ""
        } ${isClosing ? "closing" : ""}`}
        onClick={handleClose}
      ></div>
      <div
        className={`cart-modal ${isCartOpen ? "open" : ""} ${
          isClosing ? "closing" : ""
        }`}
      >
        <div className="cart-header">
          <h2 className="cart-title has-text-weight-bold is-size-7-mobile is-size-6 has-text-left-fullhd">
            Kepucet ne shporten tuaj:
          </h2>

          <button className="close-button" onClick={handleClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="cart-content">
          {cartItems.length === 0 ? (
            // Display a message when the cart is empty
            <div className="notification is-info is-light">
              <strong>Shporta juaj e blerjeve eshte bosh.</strong>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="box cart-item"
                style={{
                  backgroundColor: "white",
                  marginBottom: "10px",
                  position: "relative",
                }}
              >
                <article className="media">
                  <div className="media-left">
                    <figure className="image is-96x96">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="cart-item-image"
                      />
                    </figure>
                  </div>
                  <div className="media-content cart-item-details">
                    <div className="content">
                      <p className="cart-item-name has-text-weight-bold is-size-7-mobile is-size-7-tablet is-size-7-fullhd">
                        {item.name}
                      </p>
                      <p className="cart-item-price">
                        <span className="has-text-weight-semibold is-size-7-mobile is-size-7-tablet is-size-7-fullhd">
                          Çmimi:
                        </span>{" "}
                        <span className="has-text-weight-bold is-size-7-mobile is-size-7-tablet is-size-7-fullhd">
                          {item.discountPrice
                            ? `${item.discountPrice}`
                            : item.originalPrice}
                          €
                        </span>
                      </p>
                      <p className="cart-item-sizes has-text-weight-bold is-size-7-mobile is-size-7-tablet is-size-7-fullhd	">
                        Madhesia e zgjedhur: {item.selectedSizes.join(", ")}
                      </p>
                    </div>
                  </div>

                  <div
                    className="media-right"
                    style={{
                      position: "absolute", // Absolute position for the delete button
                      top: "50%", // Position at the top half to vertically center
                      right: "0.75rem", // Right position with some padding
                      transform: "translateY(-50%)", // Tra
                    }}
                  >
                    <button
                      className="button is-light" // Use 'is-light' for a button that blends into the background
                      onClick={() => removeFromCart(item.cartItemId)}
                      style={{
                        border: "none",
                        background: "transparent",
                        marginLeft: "auto", // This will push the button to the far right
                      }} // Remove border and background for a cleaner look
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </article>
              </div>
            ))
          )}
        </div>
        <div
          className="subtotal-box has-background-light"
          style={{ padding: "1rem" }}
        >
          <div className="content has-text-left-fullhd">
            {cartItems.length > 0 && (
              <p className="is-size-6 has-text-center-fullhd has-text-weight-bold">
                Nëntotali: <strong>{subtotal}€</strong>
              </p>
            )}
            <button
              className={`button is-normal is-fullwidth has-text-black has-text-left-fullhd ${
                cartItems.length === 0 ? "is-light" : ""
              }`}
              style={{ backgroundColor: "#E54325" }}
              disabled={cartItems.length === 0}
              onClick={handleCheckout}
            >
              <span className="icon " style={{}}>
                <FontAwesomeIcon icon={faCreditCard} />{" "}
                {/* The icon component */}
              </span>
              <span className="has-text-weight-medium		">Vazhdo te Pagesa</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartModal;
