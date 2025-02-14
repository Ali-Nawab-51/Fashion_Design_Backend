const Product = require("../models/products.model")

const singleProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)

        if(!product) {
            const error = new Error("Product not found")
            error.statusCode = 400
            throw error
        }

        res.status(200).json({ message: "Product found", status: true, product })

    } catch (error) {
        next(error)
    }
}

module.exports = singleProduct