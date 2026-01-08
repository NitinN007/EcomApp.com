import { useEffect, useState } from "react";
import api from "../services/api";
import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const statsRes = await api.get("/admin/dashboard");
      const ordersRes = await api.get("/orders");
      setStats(statsRes.data);
      setOrders(ordersRes.data);
    };

    fetchData();
  }, []);

  const updateStatus = async (orderId, status) => {
    await api.put(`/orders/${orderId}/status`, { status });
    setOrders((prev) =>
        prev.map((o) =>
            o._id === orderId ? { ...o, orderStatus: status } : o
        )
    );
  };

  const getStatusBadge = (status) => {
    const badges = {
      placed: "bg-yellow-100 text-yellow-800",
      shipped: "bg-blue-100 text-blue-800",
      delivered: "bg-green-100 text-green-800"
    };
    return badges[status] || "bg-gray-100 text-gray-800";
  };

  return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600 mt-1">Manage your store and track performance</p>
              </div>
              <div className="flex gap-3">
                <Link
                    to="/admin/update-product"
                    className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition font-medium shadow-sm hover:shadow-md"
                >
                  ✏️ Update Product
                </Link>
                <Link
                    to="/admin/add-product"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium shadow-sm hover:shadow-md"
                >
                  + Add Product
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
                icon="👥"
                title="Total Users"
                value={stats.totalUsers || 0}
                bgColor="bg-blue-50"
                textColor="text-blue-600"
                borderColor="border-blue-200"
            />
            <StatCard
                icon="📦"
                title="Total Orders"
                value={stats.totalOrders || 0}
                bgColor="bg-purple-50"
                textColor="text-purple-600"
                borderColor="border-purple-200"
            />
            <StatCard
                icon="💰"
                title="Total Revenue"
                value={`₹${(stats.totalRevenue || 0).toLocaleString()}`}
                bgColor="bg-green-50"
                textColor="text-green-600"
                borderColor="border-green-200"
            />
          </div>

          {/* Orders Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
            </div>

            <div className="p-6">
              {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📦</div>
                    <p className="text-gray-500 text-lg">No orders yet</p>
                    <p className="text-gray-400 text-sm mt-2">Orders will appear here once customers make purchases</p>
                  </div>
              ) : (
                  <div className="space-y-3">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all"
                        >
                          <div className="flex justify-between items-start gap-4">
                            {/* Order Info */}
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-semibold text-gray-900">{order.user?.name}</h3>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(order.orderStatus)} capitalize`}>
                            {order.orderStatus}
                          </span>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span>ID: {order._id.slice(-8).toUpperCase()}</span>
                                <span className="text-blue-600 font-semibold">₹{order.totalAmount.toLocaleString()}</span>
                              </div>
                            </div>

                            {/* Status Dropdown */}
                            <div className="flex-shrink-0">
                              <label className="block text-xs font-medium text-gray-600 mb-2">
                                Update Status
                              </label>
                              <select
                                  value={order.orderStatus}
                                  onChange={(e) => updateStatus(order._id, e.target.value)}
                                  className="border border-gray-300 bg-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-medium cursor-pointer hover:border-gray-400 transition"
                              >
                                <option value="placed">📍 Placed</option>
                                <option value="shipped">🚚 Shipped</option>
                                <option value="delivered">✓ Delivered</option>
                              </select>
                            </div>
                          </div>
                        </div>
                    ))}
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

const StatCard = ({ icon, title, value, bgColor, textColor, borderColor }) => (
    <div className={`${bgColor} border ${borderColor} rounded-xl p-6 transition-all hover:shadow-md`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-3xl">{icon}</span>
      </div>
      <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
      <h2 className={`text-3xl font-bold ${textColor}`}>{value}</h2>
    </div>
);

export default AdminDashboard;