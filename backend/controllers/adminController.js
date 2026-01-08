const User = require("../models/User");
const Order = require("../models/Order");

exports.getDashboardStats = async (req, res) => {
  const totalUsers = await User.countDocuments();

  const orders = await Order.find({ paymentStatus: "paid" });

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );

  res.json({
    totalUsers,
    totalOrders,
    totalRevenue,
  });
};
