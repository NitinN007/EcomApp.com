import { useEffect, useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import React from "react";
const Cart = () => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  /* ================= FETCH CART ================= */
  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/cart");
      setCart(res.data || { items: [] });
    } catch (err) {
      setError(
          err.response?.data?.message ||
          "Failed to load cart. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  /* ================= UPDATE QTY ================= */
  const updateQty = async (productId, quantity) => {
    if (quantity < 1) return;

    try {
      setError("");
      await api.put(`/cart/update/${productId}`, { quantity });
      fetchCart();
    } catch (err) {
      setError(
          err.response?.data?.message ||
          "Failed to update quantity. Please try again."
      );
    }
  };

  /* ================= REMOVE ITEM ================= */
  const removeItem = async (productId) => {
    try {
      setError("");
      await api.delete(`/cart/remove/${productId}`);
      fetchCart();
    } catch (err) {
      setError(
          err.response?.data?.message ||
          "Failed to remove item. Please try again."
      );
    }
  };

  /* ================= TOTAL ================= */
  const getTotal = () =>
      cart.items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
      );

  /* ================= CHECKOUT ================= */
  const checkout = async () => {
    try {
      setError("");
      const orderRes = await api.post("/orders");
      navigate("/checkout", { state: { order: orderRes.data } });
    } catch (err) {
      setError(
          err.response?.data?.message ||
          "Failed to proceed to checkout. Please try again."
      );
    }
  };

  /* ================= UI ================= */
  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
            🛒 Your Cart
          </h1>

          {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg">
                <p className="font-semibold">⚠️ Error</p>
                <p>{error}</p>
              </div>
          )}

          {loading ? (
              <div className="bg-white p-12 rounded-lg shadow-lg text-center">
                <p className="text-2xl text-gray-600">Loading cart...</p>
              </div>
          ) : cart.items.length === 0 ? (
              <div className="bg-white p-12 rounded-lg shadow-lg text-center">
                <p className="text-2xl text-gray-600 mb-4">
                  Your cart is empty
                </p>
                <Link to="/" className="text-blue-600 font-semibold hover:underline">
                  Continue Shopping →
                </Link>
              </div>
          ) : (
              <div className="bg-white p-8 rounded-lg shadow-lg">
                {cart.items.map((item) => (
                    <div
                        key={item.product._id}
                        className="flex justify-between items-center mb-6 pb-6 border-b border-gray-200 hover:bg-gray-50 p-4 rounded transition"
                    >
                      <div className="flex-1">
                        <h2 className="font-bold text-lg text-gray-800 mb-2">
                          {item.product.name}
                        </h2>
                        <p className="text-blue-600 font-semibold text-lg">
                          ₹{item.product.price}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 border border-gray-300 rounded-lg p-2">
                        <button
                            onClick={() =>
                                updateQty(item.product._id, item.quantity - 1)
                            }
                            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 font-bold"
                        >
                          −
                        </button>

                        <span className="px-4 font-semibold text-gray-800">
                    {item.quantity}
                  </span>

                        <button
                            onClick={() =>
                                updateQty(item.product._id, item.quantity + 1)
                            }
                            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 font-bold"
                        >
                          +
                        </button>
                      </div>

                      <button
                          onClick={() => removeItem(item.product._id)}
                          className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold"
                      >
                        🗑️ Remove
                      </button>
                    </div>
                ))}

                <div className="mt-8 pt-6 border-t-2 border-gray-300">
                  <div className="flex justify-between items-center mb-6">
                <span className="text-2xl font-bold text-gray-800">
                  Total:
                </span>
                    <span className="text-4xl font-bold text-blue-600">
                  ₹{getTotal().toLocaleString()}
                </span>
                  </div>

                  <button
                      onClick={checkout}
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-lg hover:from-green-600 hover:to-green-700 font-bold text-lg"
                  >
                    ✓ Proceed to Checkout
                  </button>
                </div>
              </div>
          )}
        </div>
      </div>
  );
};

export default Cart;
