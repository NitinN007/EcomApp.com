const Product = require("../models/Product");

/**
 * @desc Get all products (search + filter + pagination)
 * @route GET /api/products
 */
exports.getProducts = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 6;
  const skip = (page - 1) * limit;

  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};

  const category = req.query.category
    ? { category: req.query.category }
    : {};

  const query = { ...keyword, ...category };

  const products = await Product.find(query)
    .limit(limit)
    .skip(skip);

  const total = await Product.countDocuments(query);

  res.json({
    products,
    page,
    totalPages: Math.ceil(total / limit),
  });
};

/**
 * @desc Get single product
 */
exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product)
    return res.status(404).json({ message: "Product not found" });

  res.json(product);
};

/**
 * @desc Create product (Admin)
 */
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock, image } = req.body;

    if (!name || !price || !description || !category) {
      return res.status(400).json({ message: "Name, price, description, and category are required" });
    }

    const product = await Product.create({
      name,
      price: Number(price),
      description,
      category,
      stock: Number(stock) || 0,
      image: image || "https://via.placeholder.com/300",
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to create product", error: error.message });
  }
};

/**
 * @desc Update product (Admin)
 */
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        price: req.body.price ? Number(req.body.price) : product.price,
        stock: req.body.stock !== undefined ? Number(req.body.stock) : product.stock,
      },
      { new: true, runValidators: true }
    );

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Failed to update product", error: error.message });
  }
};

/**
 * @desc Delete product (Admin)
 */
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error: error.message });
  }
};
