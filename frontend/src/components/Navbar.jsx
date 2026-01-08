import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import React from "react";
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-red-600 to-blue-800 text-white px-9 py-4 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white hover:text-blue-100 transition">
          🛍️ EcomApp.com
        </Link>

        {/* Links */}
        <div className="flex items-center gap-8">
          <Link to="/" className="hover:text-blue-100 transition font-medium">
            Products
          </Link>

          {user && (
            <>
              <Link to="/cart" className="hover:text-blue-100 transition font-medium flex items-center gap-2">
                🛒 Cart
              </Link>

              <Link to="/orders" className="hover:text-blue-100 transition font-medium">
                📦 Orders
              </Link>
            </>
          )}

          {user?.user?.role === "admin" && (
            <Link to="/admin" className="hover:text-yellow-200 transition font-medium bg-yellow-600 px-4 py-1 rounded-lg">
              ⚙️ Admin
            </Link>
          )}

          {!user ? (
            <>
              <Link to="/login" className="hover:text-blue-100 transition font-medium">
                Login
              </Link>
              <Link to="/register" className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition font-medium">
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Welcome, {user.user?.name}!</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition font-medium"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
