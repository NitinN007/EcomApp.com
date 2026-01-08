import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import React from "react";
/**
 * @param {ReactNode} children
 * @param {boolean} admin - restrict route to admin only
 */
const ProtectedRoute = ({ children, admin = false }) => {
  const { user } = useContext(AuthContext);

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Admin route but user is not admin
  if (admin && user.user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
