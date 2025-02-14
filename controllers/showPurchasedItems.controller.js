const User = require("../models/user.model")

const showPurchasedItems = async (req, res, next) => {
    const { userId } = req.params
    try {
        const findUser = await User.findById(userId).select('name email phoneNumber PurchasedItems')

        if(!findUser) {
            const error = new Error("User not found")
            error.statusCode = 404
            throw error
        }

        res.status(201).json({ message: "User purchasedItems are fetched", status: true, user: findUser})
    } catch (error) {
        next(error)
    }
}

module.exports = showPurchasedItems