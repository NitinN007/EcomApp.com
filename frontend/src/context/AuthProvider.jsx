import { useState } from "react";
import { AuthContext } from "./AuthContext";
import React from "react";
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const login = (data) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
