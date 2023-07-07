const express = require("express");
const {
  addProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");
const protect = require("../middleware/authMiddleware");
const { upload } = require("../utils/fileUpload");

const router = express.Router();

// Routes
router.post("/addproduct", protect, upload.single("image"), addProduct);
router.get("/", protect, getProducts);
router.get("/product/:_id", protect, getProduct);
router.delete("/deleteproduct/:_id", protect, deleteProduct);
router.put("/updateproduct", protect, upload.single("image"), updateProduct);

module.exports = router;
