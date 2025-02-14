const User = require("../models/user.model")

const getAccess = async (req, res, next) => {
    const { token } = req.body
    console.log(req.body)

    try{
        const findUser = await User.findOne({"otp.token": token})
        if(!findUser.otp.token === null) {
            const error = new Error("Something went wrong")
            error.statusCode = 400
            throw error
        }

        res.status(200).json({ message: 'success', status: true})

    } catch (error) {
        next (error)
    }
}

module.exports = getAccess