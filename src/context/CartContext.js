import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({}); 

  // Add item to cart
  const addToCart = (productId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: prevCart[productId] ? prevCart[productId] + 1 : 1,
    }));
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      if (!prevCart[productId]) return prevCart;
      const updatedCart = { ...prevCart };
      if (updatedCart[productId] === 1) {
        delete updatedCart[productId];
      } else {
        updatedCart[productId] -= 1;
      }
      return updatedCart;
    });
  };

  // Clear cart
  const clearCart = () => {
    setCart({});
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
