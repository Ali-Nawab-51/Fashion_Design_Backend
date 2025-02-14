const User = require("../models/user.model");

const getOtpTime = async (req, res, next) => {
    const { token } = req.body

  if(token){
    console.log(token)
  }else{
    console.log("not otp token")
  }
  try {
    const findUser = await User.findOne({ "otp.token": token });
    if (!findUser) {
      const error = new Error("Something went wrong");
      error.statusCode = 400;
      throw error;
    }

    res
      .status(200)
      .json({
        message: "success",
        status: true,
        sendTime: findUser.otp.sendTime,
      });
  } catch (error) {
    next(error);
  }
};

module.exports = getOtpTime;
