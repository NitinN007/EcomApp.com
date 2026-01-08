const Order = require("../models/Order");
const Cart = require("../models/Cart");

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (req.body.status) {
      order.orderStatus = req.body.status;
      await order.save();
    }

    const populatedOrder = await Order.findById(order._id).populate("items.product");
    res.json(populatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to update order status", error: error.message });
  }
};

// CREATE ORDER (from cart)
exports.createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

    if (!cart || !cart.items || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let totalAmount = 0;
    const items = cart.items.map((item) => {
      if (!item.product) {
        throw new Error("Product not found in cart item");
      }
      const itemTotal = (item.product.price || 0) * (item.quantity || 0);
      totalAmount += itemTotal;
      return {
        product: item.product._id,
        quantity: item.quantity || 1,
        price: item.product.price || 0,
      };
    });

    if (totalAmount <= 0) {
      return res.status(400).json({ message: "Invalid order total" });
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      totalAmount,
      paymentStatus: "pending",
      orderStatus: "placed",
    });

    const populatedOrder = await Order.findById(order._id).populate("items.product");
    res.status(201).json(populatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to create order", error: error.message });
  }
};

// CONFIRM ORDER (MOCK PAYMENT)
exports.confirmOrder = async (req, res) => {
  try {
    const { orderId, paymentId } = req.body;

    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.paymentStatus = "paid";
    if (paymentId) {
      order.paymentId = paymentId;
    }
    await order.save();

    // Clear cart after payment
    await Cart.findOneAndUpdate(
      { user: order.user },
      { items: [] }
    );

    const populatedOrder = await Order.findById(order._id).populate("items.product");
    res.json({ message: "Order placed successfully", order: populatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Failed to confirm order", error: error.message });
  }
};

// USER ORDERS
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product")
      .sort({ createdAt: -1 });
    res.json(orders || []);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
};

// ADMIN – ALL ORDERS
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product")
      .sort({ createdAt: -1 });
    res.json(orders || []);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all orders", error: error.message });
  }
};
