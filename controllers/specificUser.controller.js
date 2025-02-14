const User = require("../models/user.model")

const getSpecificUser = async (req, res, next) => {
    const { userId } = req.params
    console.log(userId)
    try {
        const findUser = await User.findById(userId)

        if(!findUser) {
            const error = new Error("User not found")
            error.statusCode = 400
            throw error
        }

        res.status(200).json({message: "User found", status: true, user: findUser})
    } catch (error) {
        next(error)
    }
}

module.exports = getSpecificUser