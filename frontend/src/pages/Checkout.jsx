import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import React from "react";
const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const order = state?.order;

  if (!order) return <p>Invalid checkout</p>;

  const payNow = async () => {
    const payment = await api.post("/payment/mock");
    await api.post("/orders/confirm", {
      orderId: order._id,
      paymentId: payment.data.paymentId,
    });
    navigate("/orders");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-purple-700 py-12">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-96">
        <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">Checkout</h2>
        <p className="text-center text-gray-600 mb-6">Complete your purchase</p>

        <div className="bg-gradient-to-r from-purple-100 to-purple-50 p-6 rounded-lg mb-6">
          <p className="text-gray-600 text-sm mb-2">Order Total</p>
          <p className="text-4xl font-bold text-purple-600">₹{order.totalAmount.toLocaleString()}</p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between text-gray-700">
            <span>Items:</span>
            <span className="font-semibold">{order.items?.length || 1} item(s)</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Delivery:</span>
            <span className="text-green-600 font-semibold">Free</span>
          </div>
        </div>

        <button
          onClick={payNow}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg hover:from-purple-700 hover:to-purple-800 transition font-bold text-lg mb-4"
        >
          💳 Pay Now (Mock)
        </button>

        <p className="text-xs text-gray-500 text-center">
          This is a demo. No actual payment will be processed.
        </p>
      </div>
    </div>
  );
};

export default Checkout;
