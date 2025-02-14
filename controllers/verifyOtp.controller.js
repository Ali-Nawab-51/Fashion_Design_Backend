const User = require("../models/user.model")

const verfiyOtp = async (req, res, next) => {
    const { otp } = req.body
    console.log(req.body)
    console.log(otp)

    try{
        const findUser = await User.findOne({"otp.otp": otp})
        if(!findUser) {
            const error = new Error("Invalid OTP")
            error.statusCode = 400
            throw error
        }

        if(new Date(findUser.otp.sendTime).getTime() < new Date().getTime()) {
            const error = new Error("otp expired")
            error.statusCode = 400
            throw error
        }

        findUser.otp.otp = null
        await findUser.save()

        res.status(200).json({ message: "otp verified", status: true})
    } catch (error) {
        next(error)
    }
}

module.exports = verfiyOtp