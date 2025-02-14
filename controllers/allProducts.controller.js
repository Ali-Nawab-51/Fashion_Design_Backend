const Products = require("../models/products.model")

const allProducts = async (req, res, next) => {
    try {
        const products = await Products.find({})

        if(!products) {
            const error = new Error("Products are not present")
            error.statusCode = 400
            throw error
        }

        res.status(200).json({message: "products are fetched", products, status: true})
    } catch (error) {
        next(error)
    }
}

module.exports = allProducts