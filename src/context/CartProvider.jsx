// CartContext.js

import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Initialize cartItems from localStorage if available
  const [cartItems, setCartItems] = useState(() => {
    try {
      const items = localStorage.getItem("cartItems");
      return items ? JSON.parse(items) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setCartOpen] = useState(false);

  // ... other state and functions ...

  const addToCart = (product) => {
    setCartItems((currentItems) => {
      const productToAdd = {
        ...product,
        cartItemId: Date.now(), // Using a timestamp for simplicity
      };
      const updatedItems = [...currentItems, productToAdd];
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      return updatedItems;
    });
    setCartOpen(true);
  };

  const removeFromCart = (cartItemId) => {
    setCartItems((currentItems) => {
      const updatedItems = currentItems.filter(
        (item) => item.cartItemId !== cartItemId
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const toggleCart = () => {
    // Toggle the cart modal
    setCartOpen(!isCartOpen);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    isCartOpen,
    toggleCart,
  };

  // ... rest of your context provider ...

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
