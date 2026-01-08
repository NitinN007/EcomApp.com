const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: { type: Number, required: true },
  comment: String,
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: Number, default: 0 },
   image: {
      type: String,
      default: "https://via.placeholder.com/300",
    },


  reviews: [reviewSchema],
  averageRating: { type: Number, default: 0 },

}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
