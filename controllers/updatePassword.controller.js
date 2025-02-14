const User = require("../models/user.model")
const bcrypt = require("bcrypt")

const updatePassword = async (req, res, next) => {
    try{
        const {password, confirmPassword, token} = req.body
        console.log(req.body)
        const findUser = await User.findOne({"otp.token": token})
        if(!findUser){
            const error = new Error("token expired")
            error.statusCode = 400
            throw error
        }

        if(new Date(findUser.otp.sendTime).getTime() + 5*60*1000 < new Date().getTime()) {
            const error = new Error("Something went wrong")
            error.statusCode = 400
            throw error
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        findUser.password = hashedPassword
        findUser.otp.sendTime = null
        findUser.otp.token = null

        await findUser.save()

        res.status(200).json({ message: "password updated successfully", status: true})
    } catch (error) {
        next(error)
    }
}

module.exports = updatePassword