import React, { createContext, useContext, useEffect, useState } from "react";
import api, { setAuthToken } from "../services/api.js";

const AuthContext = createContext(null);

const TOKEN_KEY = "shopez_token";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (storedToken) {
      setAuthToken(storedToken);
      api
        .get("/auth/me")
        .then((res) => {
          setUser(res.data.user);
        })
        .catch(() => {
          localStorage.removeItem(TOKEN_KEY);
          setAuthToken(null);
          setUser(null);
        })
        .finally(() => setInitializing(false));
    } else {
      setInitializing(false);
    }
  }, []);

  const handleAuthSuccess = (payload) => {
    const { token, user: userData } = payload;
    localStorage.setItem(TOKEN_KEY, token);
    setAuthToken(token);
    setUser(userData);
  };

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    handleAuthSuccess(res.data);
  };

  const register = async (name, email, password) => {
    const res = await api.post("/auth/register", { name, email, password });
    handleAuthSuccess(res.data);
  };

  const adminLogin = async (email, password) => {
    const res = await api.post("/admin/login", { email, password });
    handleAuthSuccess(res.data);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setAuthToken(null);
    setUser(null);
  };

  const value = {
    user,
    initializing,
    login,
    register,
    adminLogin,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin"
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);