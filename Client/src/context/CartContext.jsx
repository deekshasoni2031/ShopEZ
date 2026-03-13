import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api.js";
import { useAuth } from "./AuthContext.jsx";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    if (!isAuthenticated) {
      setCart(null);
      return;
    }
    setLoading(true);
    try {
      const res = await api.get("/cart");
      setCart(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const addToCart = async (productId, quantity = 1) => {
    const res = await api.post("/cart/items", { productId, quantity });
    setCart(res.data);
  };

  const updateQuantity = async (productId, quantity) => {
    const res = await api.put(`/cart/items/${productId}`, { quantity });
    setCart(res.data);
  };

  const removeFromCart = async (productId) => {
    const res = await api.delete(`/cart/items/${productId}`);
    setCart(res.data);
  };

  const clearCartLocally = () => {
    setCart((prev) => (prev ? { ...prev, items: [] } : prev));
  };

  const value = {
    cart,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    refreshCart: fetchCart,
    clearCartLocally
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);