require('dotenv').config()
const nodemailer = require("nodemailer")

const sendOrderId = (orderId, email) => {
    try {
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })

        const mailOption = {
            from: process.env.EMIAL,
            to: email,
            subject: "Sending Email with React and Nodejs",
            html: `<h1>Your orderID is ${orderId}</h1>`
        }

        transporter.sendMail(mailOption,(error, info) => {
            if(error) {
                console.log("Error ", error)
            }else{
                console.log("Email sent ", info.response)
                res.status(201).json({status: 201, info})
            }
        })
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = sendOrderId