const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    name: {
      type: String,
      required: [true, "Please enter a Product Name"],
      trim: true,
    },
    sku: {
      // Store Keeping Unit, usually a Barcode
      type: String,
      required: true,
      default: "SKU",
      trim: true,
    },

    category: {
      type: String,
      required: [true, "Please enter a Product Category"],
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    image: {
      type: Object,
      default: {},
    },

    description: {
      type: String,
      required: [true, "Please enter a Product Description"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

exports.module = Product;
