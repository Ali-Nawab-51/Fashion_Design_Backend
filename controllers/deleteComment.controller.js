const Product = require("../models/products.model");

const deleteComment = async (req, res, next) => {
    try {
        const { reviewerId, productId } = req.body;

        // Find the product by ID
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found", status: false });
        }

        // Filter out the review with the given reviewerId
        product.reviews = product.reviews.filter((review) => review.reviewerId.toString() !== reviewerId.toString());

        // Save the updated product
        await product.save();

        res.status(200).json({ message: "Comment is deleted", status: true });
    } catch (error) {
        next(error);
    }
};

module.exports = deleteComment;
