const Wishlist = require("../models/Wishlist");

exports.getWishlist = async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.user._id }).populate("products");
  res.json(wishlist || { products: [] });
};

exports.toggleWishlist = async (req, res) => {
  const { productId } = req.body;

  let wishlist = await Wishlist.findOne({ user: req.user._id });

  if (!wishlist) {
    wishlist = await Wishlist.create({
      user: req.user._id,
      products: [productId],
    });
  } else {
    const exists = wishlist.products.includes(productId);
    if (exists) {
      wishlist.products.pull(productId);
    } else {
      wishlist.products.push(productId);
    }
  }

  await wishlist.save();
  res.json(wishlist);
};
