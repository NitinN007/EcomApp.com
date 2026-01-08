const Cart = require("../models/Cart");

/* ================= GET CART ================= */
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
        .populate("items.product");

    res.json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch cart",
      error: error.message
    });
  }
};

/* ================= ADD TO CART ================= */
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || typeof quantity !== "number" || quantity < 1) {
      return res.status(400).json({
        message: "Valid productId and quantity are required"
      });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [{ product: productId, quantity }]
      });
    } else {
      const item = cart.items.find(
          (i) => i.product.toString() === productId
      );

      if (item) {
        item.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
    }

    await cart.save();

    await cart.populate("items.product"); // ✅ NO extra DB query
    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add item to cart",
      error: error.message
    });
  }
};

/* ================= REMOVE FROM CART ================= */
exports.removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
        (item) => item.product.toString() !== req.params.productId
    );

    await cart.save();
    await cart.populate("items.product");

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: "Failed to remove item from cart",
      error: error.message
    });
  }
};

/* ================= UPDATE QUANTITY ================= */
exports.updateQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;

    if (typeof quantity !== "number" || quantity < 1) {
      return res.status(400).json({
        message: "Quantity must be a number greater than 0"
      });
    }

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
        (i) => i.product.toString() === req.params.productId
    );

    if (!item) {
      return res.status(404).json({
        message: "Item not found in cart"
      });
    }

    item.quantity = quantity;
    await cart.save();
    await cart.populate("items.product");

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update quantity",
      error: error.message
    });
  }
};
