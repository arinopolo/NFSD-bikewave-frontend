import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    token: null,
    userId: null,
  });

  const updateUser = (userData) => {
    window.localStorage.setItem("token", userData.token);
    window.localStorage.setItem("userId", userData.userId);

    setUser({ ...user, ...userData });
  };

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const userId = window.localStorage.getItem("userId");
    if (token) {
      setUser((prevUser) => ({ ...prevUser, token }));
    }
    if (userId) {
      setUser((prevUser) => ({ ...prevUser, userId }));
    }
  }, []);

  const logout = () => {
    setUser((prevUser) => ({ ...prevUser, token: null, userId: null }));
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userId");
  };

  const contextValue = {
    user,
    setUser,
    updateUser,
    logout,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
