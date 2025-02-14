const User = require("../models/user.model");
const crypto = require("crypto")
const sendMail = require("../utils/sendMail")

const forgetPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        const findUser = await User.findOne({ email });

        if (!findUser) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        if(findUser.otp.otp && new Date(findUser.otp.sendTime).getTime() > new Date().getTime()) {

            const error = new Error(`Please wait until ${new Date(findUser.otp.sendTime).toLocaleTimeString()}`);
            error.statusCode = 400
            throw error
        }

        const otp = Math.floor(Math.random() * 90000) + 100000

        const token = crypto.randomBytes(32).toString('hex')

        sendMail(otp, email)

        findUser.otp.otp = otp
        findUser.otp.sendTime = new Date().getTime() + 1*60*1000
        findUser.otp.token = token

        await findUser.save()

        res.status(200).json({message: "please check your email for the otp", status: true, token})
        
        
    } catch (error) {
        next(error);
    }
}

module.exports = forgetPassword;