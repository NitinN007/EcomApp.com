import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import React from "react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-red-600 to-blue-800 text-white px-5 md:px-9 py-4 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl md:text-2xl font-bold text-white hover:text-blue-100 transition"
          onClick={() => setMenuOpen(false)}
        >
          🛍️ EcomApp.com
        </Link>

        {/* Hamburger Button (Mobile only) */}
        <button
          className="md:hidden text-3xl font-bold"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="hover:text-blue-100 transition font-medium">
            Products
          </Link>

          {user && (
            <>
              <Link
                to="/cart"
                className="hover:text-blue-100 transition font-medium flex items-center gap-2"
              >
                🛒 Cart
              </Link>

              <Link
                to="/orders"
                className="hover:text-blue-100 transition font-medium"
              >
                📦 Orders
              </Link>
            </>
          )}

          {user?.user?.role === "admin" && (
            <Link
              to="/admin"
              className="hover:text-yellow-200 transition font-medium bg-yellow-600 px-4 py-1 rounded-lg"
            >
              ⚙️ Admin
            </Link>
          )}

          {!user ? (
            <>
              <Link
                to="/login"
                className="hover:text-blue-100 transition font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition font-medium"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">
                Welcome, {user.user?.name}!
              </span>
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

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 bg-white/10 rounded-lg p-4">
          <Link
            to="/"
            className="hover:text-blue-100 transition font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Products
          </Link>

          {user && (
            <>
              <Link
                to="/cart"
                className="hover:text-blue-100 transition font-medium"
                onClick={() => setMenuOpen(false)}
              >
                🛒 Cart
              </Link>

              <Link
                to="/orders"
                className="hover:text-blue-100 transition font-medium"
                onClick={() => setMenuOpen(false)}
              >
                📦 Orders
              </Link>
            </>
          )}

          {user?.user?.role === "admin" && (
            <Link
              to="/admin"
              className="hover:text-yellow-200 transition font-medium bg-yellow-600 px-4 py-2 rounded-lg w-fit"
              onClick={() => setMenuOpen(false)}
            >
              ⚙️ Admin
            </Link>
          )}

          {!user ? (
            <>
              <Link
                to="/login"
                className="hover:text-blue-100 transition font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition font-medium w-fit"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex flex-col gap-3">
              <span className="text-sm font-medium">
                Welcome, {user.user?.name}!
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition font-medium w-fit"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
