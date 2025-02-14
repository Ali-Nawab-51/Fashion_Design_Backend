const Product = require("../models/products.model");
const mongoose = require("mongoose");
const cloudinary = require("../utils/cloudinaryConfig");

const addProduct = async (req, res, next) => {
    
  try {

       // Women's Summer Dress
       const newProduct1 = new Product({
        name: "Women's Summer Dress",
        category: "Clothing",
        description: "A lightweight and stylish summer dress for women.",
        originalPrice: 45.99,
        discountedPrice: 34.99,
        discountedPercentage: 24,
        rating: 4.7,
        stock: 80,
        brand: "SummerStyle",
        warrantyInformation: "No warranty",
        shippingInformation: "Ships within 2-4 business days",
        availabilityStatus: "In Stock",
        returnPolicy: "30-day return policy",
        color: "Yellow",
        author: "Summer Designer",
        imageURL: "1",
        subcategories: [
          { size: "small", price: 34.99, stock: 20 },
          { size: "medium", price: 35.99, stock: 25 },
          { size: "large", price: 36.99, stock: 15 },
          { size: "XXL", price: 37.99, stock: 10 },
        ],
        reviews: [
          {
            rating: 5,
            comment: "Perfect for summer! Love the color and fit.",
            reviewerName: "Emily Johnson",
            reviewerId: new mongoose.Types.ObjectId(),
          },
          {
            rating: 4,
            comment: "Great dress, but the material is a bit thin.",
            reviewerName: "Sarah Lee",
            reviewerId: new mongoose.Types.ObjectId(),
          },
        ],
      });
  
      // Women's Leather Handbag
      const newProduct2 = new Product({
        name: "Women's Leather Handbag",
        category: "Accessories",
        description: "Elegant leather handbag for women.",
        originalPrice: 79.99,
        discountedPrice: 59.99,
        discountedPercentage: 25,
        rating: 4.6,
        stock: 60,
        brand: "LuxuryBags",
        warrantyInformation: "No warranty",
        shippingInformation: "Ships within 3-5 business days",
        availabilityStatus: "In Stock",
        returnPolicy: "30-day return policy",
        color: "Brown",
        author: "Luxury Designer",
        imageURL: "2",
        subcategories: [
          { size: "small", price: 59.99, stock: 30 },
          { size: "medium", price: 64.99, stock: 20 },
          { size: "large", price: 69.99, stock: 10 },
        ],
        reviews: [
          {
            rating: 5,
            comment: "Beautiful and high-quality handbag!",
            reviewerName: "Sophia Martinez",
            reviewerId: new mongoose.Types.ObjectId(),
          },
          {
            rating: 4,
            comment: "Love the design, but the strap is a bit short.",
            reviewerName: "Olivia Brown",
            reviewerId: new mongoose.Types.ObjectId(),
          },
        ],
      });
  
      // Women's Running Shoes
      const newProduct3 = new Product({
        name: "Women's Running Shoes",
        category: "Footwear",
        description: "Comfortable and lightweight running shoes for women.",
        originalPrice: 89.99,
        discountedPrice: 69.99,
        discountedPercentage: 22,
        rating: 4.8,
        stock: 50,
        brand: "RunPro",
        warrantyInformation: "1-year warranty",
        shippingInformation: "Ships within 3-5 business days",
        availabilityStatus: "In Stock",
        returnPolicy: "30-day return policy",
        color: "Black",
        author: "Sports Gear Inc.",
        imageURL: "3",
        subcategories: [
          { size: "small", price: 69.99, stock: 15 },
          { size: "medium", price: 69.99, stock: 20 },
          { size: "large", price: 69.99, stock: 10 },
          { size: "XXL", price: 69.99, stock: 5 },
        ],
        reviews: [
          {
            rating: 5,
            comment: "Best running shoes I've ever owned!",
            reviewerName: "Lily Adams",
            reviewerId: new mongoose.Types.ObjectId(),
          },
          {
            rating: 4,
            comment: "Very comfortable, but a bit pricey.",
            reviewerName: "Emma Wilson",
            reviewerId: new mongoose.Types.ObjectId(),
          },
        ],
      });
  
      // Women's Winter Jacket
      const newProduct4 = new Product({
        name: "Women's Winter Jacket",
        category: "Clothing",
        description: "Warm and stylish jacket for the winter season.",
        originalPrice: 120.99,
        discountedPrice: 99.99,
        discountedPercentage: 17,
        rating: 4.9,
        stock: 40,
        brand: "WinterWear",
        warrantyInformation: "6 months warranty",
        shippingInformation: "Ships within 4-7 business days",
        availabilityStatus: "In Stock",
        returnPolicy: "30-day return policy",
        color: "Red",
        author: "WinterFashion",
        imageURL: "4",
        subcategories: [
          { size: "small", price: 99.99, stock: 10 },
          { size: "medium", price: 99.99, stock: 15 },
          { size: "large", price: 99.99, stock: 10 },
          { size: "XXL", price: 99.99, stock: 5 },
        ],
        reviews: [
          {
            rating: 5,
            comment: "Super warm and stylish! Perfect for cold weather.",
            reviewerName: "Sophia Taylor",
            reviewerId: new mongoose.Types.ObjectId(),
          },
          {
            rating: 4,
            comment: "Nice jacket but runs a bit small.",
            reviewerName: "Olivia Green",
            reviewerId: new mongoose.Types.ObjectId(),
          },
        ],
      });
  
      // Women's Elegant Watch
      const newProduct5 = new Product({
        name: "Women's Elegant Watch",
        category: "Accessories",
        description: "Luxury watch with a sleek design for women.",
        originalPrice: 199.99,
        discountedPrice: 149.99,
        discountedPercentage: 25,
        rating: 4.8,
        stock: 30,
        brand: "TimeLux",
        warrantyInformation: "1-year warranty",
        shippingInformation: "Ships within 2-4 business days",
        availabilityStatus: "In Stock",
        returnPolicy: "30-day return policy",
        color: "Gold",
        author: "Luxury Timepieces",
        imageURL: "5",
        subcategories: [
          { size: "small", price: 149.99, stock: 10 },
          { size: "medium", price: 149.99, stock: 15 },
          { size: "large", price: 149.99, stock: 5 },
        ],
        reviews: [
          {
            rating: 5,
            comment: "Absolutely gorgeous watch! Worth every penny.",
            reviewerName: "Emily Roberts",
            reviewerId: new mongoose.Types.ObjectId(),
          },
          {
            rating: 4,
            comment: "Elegant, but the strap could be better quality.",
            reviewerName: "Jessica Carter",
            reviewerId: new mongoose.Types.ObjectId(),
          },
        ],
      });
  
      // Save all products to the database
      await newProduct1.save();
      await newProduct2.save();
      await newProduct3.save();
      await newProduct4.save();
      await newProduct5.save();

    // Send success response
    res.status(200).json({ message: "Product added to the database" });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = addProduct;