const { v4 } = require("uuid");
const User = require("../models/user.model");
const sendOrderId = require("../utils/sendOrderId")

// Update Order Status
const orderStatus = async (req, res, next) => {
  const { userId, paymentMethod, products } = req.body;

  try {
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", status: false });
    }

    // Generate a unique order ID (you can use a library like `uuid` for this)
    const orderId = `ORDER-${v4()}`;

    // Create the order status object
    const orderStatus = {
      orderId,
      status: "Order Placed", // Initial status
      paymentMethod,
      products: products.map((product) => ({
        productId: product.productId,
        name: product.name,
        quantity: product.quantity,
        price: product.price,
        size: product.size,
      })),
    };

    sendOrderId(orderId, user.email)

    // Add the order status to the user's OrderStatus array
    user.OrderStatus.push(orderStatus);

    // Move cart items to PurchasedItems
    user.PurchasedItems.push(...products);

    // Clear the CartItems array
    user.CartItems = [];

    // Save the updated user document
    await user.save();

    res.status(200).json({
      message: "Order status updated successfully",
      status: true,
      orderId,
    });
  } catch (error) {
    next(error);
  }
};



module.exports = orderStatus