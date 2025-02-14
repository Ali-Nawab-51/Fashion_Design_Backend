const User = require("../models/user.model")
const Product = require("../models/products.model")

const addComment = async (req, res, next) => {
    const { productId, reviewerId, reviewerName, rating, comment } = req.body

    console.log(productId, reviewerId, reviewerName, rating, comment)
    try {
        const findUser = await User.findById(reviewerId)

        if(!findUser) {
            const error = new Error("User not found")
            error.statusCode = 400
            throw error
        }

        const product = await Product.findById(productId)

        if(!product) {
            const error = new Error("Product not found")
            error.statusCode = 400
            throw error
        }

        product.reviews.push({
            rating,
            comment,
            reviewerId,
            reviewerName
        });

        await product.save()

        res.status(200).json({message: "Comment is added", status: true})
    } catch (error) {
        next(error)
    }
}

module.exports = addComment