require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("../models/user.model")

const Product = require("../models/products.model");

const stripeIntegration = async (req, res, next) => {
  try {
    const { data } = req.body;

    // Fetch all products from the database
    const products = await Product.find();

    

    // Attach imageURL from database to the frontend data
    const updatedData = data.map((product) => {
      const matchedProduct = products.find(item => item.name === product.name);
      if (matchedProduct) {
        return { ...product, imageURL: matchedProduct.imageURL };
      }
      return product; // If no match found, return original product
    });

    console.log("Updated Data:", JSON.stringify(updatedData, null, 2));

    // Use updatedData for Stripe instead of original data
    const lineItems = updatedData.map((product) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.name,
          images: product.imageURL ? [product.imageURL] : [], // Add image to Stripe
        },
        unit_amount: Math.round(product.price * 100), // Stripe expects amount in cents
      },
      quantity: product.quantity,
    }));

    console.log("Line Items:", JSON.stringify(lineItems, null, 2));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:5173/track/order', // Replace with your success URL
      cancel_url: 'http://localhost:5173/cancel',  // Replace with your cancel URL
    });

    console.log("Stripe Session:", session);

    res.json({ id: session.id });
  } catch (error) {
    next(error);
  }
};

module.exports = stripeIntegration;
