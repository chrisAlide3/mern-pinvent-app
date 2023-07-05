const express = require("express");
const { getProducts, addProduct } = require("../controllers/productController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Routes
router.post("/addproduct", protect, addProduct);
router.get("/", protect, getProducts);

module.exports = router;
