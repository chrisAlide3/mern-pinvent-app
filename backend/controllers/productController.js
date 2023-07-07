const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const { fileSizeFormatter } = require("../utils/fileUpload");

// Add product
const addProduct = asyncHandler(async (req, res) => {
  const { name, sku, category, price, quantity, description } = req.body;
  const userId = req.user.id;

  // Validation
  if (!name || !sku || !category || !price || !quantity || !description) {
    res.status(400);
    throw new Error("All fields except image are required");
  }

  // Handle file upload
  let fileData = {};
  if (req.file) {
    // Transform file size
    fileData = {
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Write product to DB
  const product = await Product.create({
    user: userId,
    name,
    sku,
    category,
    price,
    quantity,
    image: fileData,
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

// Get single product
const getProduct = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const product = await Product.findById(_id);
  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }

  res.status(200).json(product);
});

// Delete product
const deleteProduct = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const product = await Product.findByIdAndDelete(_id);
  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }
  res.status(200).json({
    message: "Product deleted succesfully",
  });
});

// Update product
const updateProduct = asyncHandler(async (req, res) => {
  // Handle file upload
  let fileData = {};
  if (req.file) {
    fileData = {
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2), // Transform file size
    };
  }
  const product = await Product.findById(req.body._id);
  // Error if no product found
  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }
  // Update submitted fields
  const { name, sku, category, price, quantity, description } = product;
  product.name = req.body.name || name;
  product.sku = req.body.sku || sku;
  product.category = req.body.category || category;
  product.price = req.body.price || price;
  product.quantity = req.body.quantity || quantity;
  product.description = req.body.description || description;
  product.image = fileData || image;

  const updatedProduct = await product.save();
  if (!updatedProduct) {
    res.status(500);
    throw new Error("Error saving the changes. Please try again later");
  }
  // Send back updated product
  res.status(200).json(updatedProduct);
});

module.exports = {
  addProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
