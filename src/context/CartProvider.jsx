// CartContext.js

import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setCartOpen] = useState(false);

  const addToCart = (product) => {
    // Implement logic to add product to cart
    setCartItems((currentItems) => [...currentItems, product]);
    setCartOpen(true); // Open cart modal when item is added
  };

  const removeFromCart = (productId) => {
    // Implement logic to remove product from cart by id
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  };

  const toggleCart = () => {
    // Toggle the cart modal
    setCartOpen(!isCartOpen);
  };

  // The value object includes everything you want to provide through this context
  const value = {
    cartItems,
    isCartOpen,
    addToCart,
    removeFromCart,
    toggleCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
