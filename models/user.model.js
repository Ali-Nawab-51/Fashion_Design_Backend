const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  cnic: {
    type: String,
    required: true,
    unique: true,
  },
  postalAddress: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  imageUrl: { type: String },

  otp: {
    otp: { type: String },
    sendTime: { type: Number },
    token: { type: String },
  },
  CartItems: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: { type: String },
      size: { type: String },
      price: { type: Number },
      quantity: { type: Number, default: 1 },
    },
  ],
  OrderStatus: [
    {
      orderId: { type: String },
      status: { type: String },
      paymentMethod: { type: String },

      products: [
        {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: { type: String },
        quantity: { type: Number },
        price: { type: Number },
        size: { type: String },
      },
    ]
    },
  ],
  PurchasedItems: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: { type: String },
      size: { type: String },
      price: { type: Number },
      quantity: { type: Number, default: 1 },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("User", userSchema);
