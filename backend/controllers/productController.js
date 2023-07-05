const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

// Add product
const addProduct = asyncHandler(async (req, res) => {
  const { name, sku, category, price, quantity, image, description } = req.body;
  const userId = req.user.id;

  // Validation
  if (!name || !sku || !category || !price || !quantity || !description) {
    res.status(400);
    throw new Error("All fields except image are required");
  }

  // Manage Image upload

  // Write product to DB
  const product = await Product.create({
    user: userId,
    name,
    sku,
    category,
    price,
    quantity,
    image,
    description,
  });
  // Error if product not written
  if (!product) {
    res.status(500);
    throw new Error("Product not added, please try again later");
  }
  // Response if product written
  res.status(201).json(product);
});

// Get all products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json({ products });
});

module.exports = {
  addProduct,
  getProducts,
};
