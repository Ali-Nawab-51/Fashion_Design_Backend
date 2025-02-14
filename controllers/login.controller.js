const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");

const login = async (req, res, next) => {
    try{
        const { email, password } = req.body;
        console.log(email, password);

        const findUser = await User.findOne({ email });
        if(!findUser) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        const isMatch = await bcrypt.compare(password, findUser.password);

        if(!isMatch) {
            const error = new Error("Password is incorrect");
            error.statusCode = 400;
            throw error;
        }

        const token = jwt.sign({ userId: findUser._id }, process.env.ACCESS_TOKEN, { expiresIn: '1h' });


        res.status(200).json({ message: "User logged in successfully", status: true, token , user_id: findUser._id, email: findUser.email, imageURL: findUser.imageUrl, name: findUser.name});
    } catch (error) {
        next(error)
    }
}

module.exports = login;