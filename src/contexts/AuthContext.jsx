import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const updateToken = (token) => {
    window.localStorage.setItem("token", token);

    setToken(token);
  };

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    setToken(token);
  }, []);

  const logout = () => {
    setToken(null);
    window.localStorage.removeItem("token");
  };

  const contextValue = {
    token,
    updateToken,
    logout,
  };
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
