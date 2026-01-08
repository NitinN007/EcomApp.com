import { useEffect, useState } from "react";
import api from "../services/api";
import React from "react";
import {Link} from "react-router-dom";
const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders/my").then((res) => setOrders(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-2 text-center text-gray-800">📦 My Orders</h1>
        <p className="text-center text-gray-600 mb-8">Track and manage your orders</p>

        {orders.length === 0 ? (
          <div className="bg-white p-12 rounded-lg shadow-lg text-center">
            <p className="text-2xl text-gray-600 mb-4">No orders yet</p>
            <Link to="/" className="text-blue-600 font-semibold hover:underline">
              Start Shopping →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Order ID</p>
                    <p className="font-mono text-gray-800 font-semibold">{order._id.slice(-8).toUpperCase()}</p>
                  </div>
                  <div className="text-right">
                    <p className={`inline-block px-4 py-2 rounded-full font-semibold text-sm ${
                      order.paymentStatus === 'paid' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.paymentStatus === 'paid' ? '✓ Paid' : '⏳ Pending'}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="text-2xl font-bold text-blue-600">₹{order.totalAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Items</p>
                    <p className="text-2xl font-bold text-gray-800">{order.items?.length || 0}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-semibold text-gray-800 capitalize">{order.orderStatus || 'Pending'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-semibold text-gray-800">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
