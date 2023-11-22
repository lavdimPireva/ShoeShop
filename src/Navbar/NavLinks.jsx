import React, { useState } from "react";
import { useCart } from "../context/CartProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./NavLinks.css";

const NavLinks = () => {
  const { cartItems, toggleCart } = useCart();

  // Calculate total price
  const totalPrice = cartItems
    .reduce((total, item) => {
      const price = item.discountPrice
        ? parseFloat(item.discountPrice)
        : parseFloat(item.originalPrice);
      return total + price;
    }, 0)
    .toFixed(2);
  return (
    <div className="level-right px-2 py-2">
      <a className="level-item navbar-item" href="/">
        Home
      </a>
      <a className="level-item navbar-item" href="/">
        About
      </a>
      <a className="level-item navbar-item" href="/">
        Products
      </a>
      <a className="level-item navbar-item" onClick={toggleCart}>
        <FontAwesomeIcon icon={faShoppingCart} />
        {cartItems.length > 0 && (
          <span className="badge badge-near-icon">{cartItems.length}</span>
        )}
        <span>{totalPrice} €</span>
      </a>
    </div>
  );
};

export default NavLinks;
