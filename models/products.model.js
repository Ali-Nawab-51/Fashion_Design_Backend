const mongoose = require("mongoose");

// Schema for product reviews
const reviewSchema = new mongoose.Schema({
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now },
  reviewerName: { type: String, required: true },
  reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" } // Links to user
});

// Schema for product variations (sizes)
const subCategorySchema = new mongoose.Schema({
  size: { type: String, enum: ["small", "medium", "large", "XXL"], required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 }
});

// Main product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  originalPrice: { type: Number, required: true },
  discountedPrice: { type: Number },
  discountedPercentage: { type: Number },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  stock: { type: Number, required: true },
  brand: { type: String },
  warrantyInformation: { type: String },
  shippingInformation: { type: String },
  availabilityStatus: { type: String, enum: ["In Stock", "Out of Stock", "Preorder"], default: "In Stock" },
  returnPolicy: { type: String },
  color: { type: String },
  author: { type: String },
  imageURL: { type: String },
  subcategories: [subCategorySchema], // Includes different sizes & prices
  reviews: [reviewSchema] // Stores customer reviews
});

// Create model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
