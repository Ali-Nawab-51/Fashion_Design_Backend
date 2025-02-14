const User = require("../models/user.model")

const clearCart = async ( req, res, next ) => {
    try {
        const { userId } = req.body
        
        const findUser = await User.findById(userId)

        if(!findUser) {
            const error = new Error("User not found")
            error.statusCode = 400
            throw error
        }

        findUser.CartItems = []
        await findUser.save()
        res.status(200).json({ message: "Cart is cleared", status: true})
    } catch (error) {
        next(error)
    }
}

module.exports = clearCart