const User = require("../models/user.model")

const addToCart = async ( req, res, next) => {
    try {
        const { userId, productId, name, price, quantity, size } = req.body

        const findUser = await User.findById(userId)
        
        if(!findUser) {
            const error = new Error("User not found")
            error.statusCode = 400
            throw error
        }

        const findProduct = findUser.CartItems.find((item) => item.productId.toString() === productId && item.size === size)

        if(findProduct) {
            findProduct.quantity += 1
        } else {
            findUser.CartItems.push({ productId, name, size, price, quantity})
        }

        await findUser.save()
        res.status(200).json({message: "Product added to cart", status: true, cart: findUser.CartItems})
    } catch ( error ) {
        next(error)
    }
}

module.exports = addToCart