const User = require("../models/user.model")

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find()

        if(!users) {
            const error = new Error("Users not found")
            error.statusCode = 400
            throw error
        }

        res.status(200).json({ message: "Users are retrieved from the database", status: true, users})
    } catch (error) {
        next(error)
    }
}

module.exports = getUsers