const User = require("../models/user.model");

const removeFromCart = async (req, res, next) => {
    try {
        const { userId, productId, size } = req.body;

        console.log(userId, productId, size)

        // Find the user
        const findUser = await User.findById(userId);
        if (!findUser) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        // Find the product in the cart
        const productIndex = findUser.CartItems.findIndex(
            (item) => item.productId.toString() === productId && item.size === size
        );

        if (productIndex === -1) {
            const error = new Error("Product not found in cart");
            error.statusCode = 404;
            throw error;
        }

        // Decrement the quantity or remove the product if quantity is 1
        if (findUser.CartItems[productIndex].quantity > 1) {
            findUser.CartItems[productIndex].quantity -= 1;
        } else {
            findUser.CartItems.splice(productIndex, 1); // Remove the product if quantity is 1
        }

        await findUser.save();
        console.log(findUser)
        res.status(200).json({ message: "Item removed", status: true });
    } catch (error) {
        next(error);
    }
};

module.exports = removeFromCart;