const User = require("../models/user.model");

const fetchSingleProduct = async (req, res, next) => {
    const { userId } = req.params; // Corrected to extract from params
  
    try {
        const user = await User.findById(userId); // Populate product details
        if (!user) {
            const error = new Error("User not found")
            error.statusCode = 400
            throw error
        }

       // console.log(user)
        res.status(200).json({ message: "Single User Cart Data", status: true, cart: user.CartItems });
    } catch (error) {
        next(error);
    }
};

module.exports = fetchSingleProduct;
