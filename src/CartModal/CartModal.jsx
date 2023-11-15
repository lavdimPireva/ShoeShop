import React from "react";
import "./CartModal.css"; // Make sure to import the CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const CartModal = ({ isCartOpen, closeCart, cartItems }) => {
  if (!isCartOpen) return null;

  return (
    <>
      <div
        className={`modal-overlay ${isCartOpen ? "is-active" : ""}`}
        onClick={closeCart}
      ></div>

      <div className={`cart-modal ${isCartOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h2 className="cart-title">Kepucet ne shporten tuaj:</h2>
          <button className="close-button" onClick={closeCart}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="cart-content">
          {cartItems?.map((item) => (
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
                    <p className="cart-item-name is-size-6 has-text-weight-semibold">
                      {item.name}
                    </p>
                    <p className="cart-item-price">
                      <span className="has-text-weight-semibold is-size-6">
                        Price:
                      </span>{" "}
                      {item.discountPrice
                        ? `${item.discountPrice} (Discounted)`
                        : item.originalPrice}
                    </p>
                  </div>
                </div>
                <div className="media-right">
                  <button
                    className="delete"
                    // onClick={() => removeItemFromCart(item.id)}
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
