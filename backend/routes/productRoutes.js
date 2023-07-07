const express = require("express");
const { getProducts, addProduct } = require("../controllers/productController");
const protect = require("../middleware/authMiddleware");
const { upload } = require("../utils/fileUpload");

const router = express.Router();

// Routes
router.post("/addproduct", protect, upload.single("image"), addProduct);
router.get("/", protect, getProducts);

module.exports = router;
