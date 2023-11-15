import React, { useState } from "react";
import "./CartModal.css"; // Make sure to import the CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartProvider";

const CartModal = ({ isCartOpen, closeCart, cartItems }) => {
  const [isClosing, setClosing] = useState(false);

  const { removeFromCart } = useCart();

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      closeCart();
    }, 300);
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
          <h2 className="cart-title is-size-5-fullhd ">
            Kepucet ne shporten tuaj:
          </h2>

          <button className="close-button" onClick={handleClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="cart-content">
          {cartItems.map((item) => (
            <div key={item.id} className="box cart-item">
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
                    <p className="cart-item-name is-size-6-fullhd has-text-weight-semibold">
                      {item.name}
                    </p>
                    <p className="cart-item-price">
                      <span className="has-text-weight-semibold is-size-6-fullhd">
                        Çmimi:
                      </span>{" "}
                      <span className="has-text-weight-bold">
                        {item.discountPrice
                          ? `${item.discountPrice}`
                          : item.originalPrice}
                        €
                      </span>
                    </p>
                    <p className="cart-item-sizes has-text-weight-normal is-size-6-fullhd">
                      Madhesia e zgjedhur: {item.selectedSizes.join(", ")}
                    </p>
                  </div>
                </div>
                <div className="media-right">
                  <button
                    className="delete"
                    onClick={() => removeFromCart(item.cartItemId)}
                  ></button>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CartModal;
