require('dotenv').config();
const twilio = require('twilio');
const crypto = require('crypto');
const userDB = require('../model/userdetails_model');
const userUtils = require('../utils/userUtils');



module.exports.isLoggedIn = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.redirect('/');
    }
};

module.exports.isLogin = (req, res, next) => {
    if (req.session.userId) {
        res.redirect('/');
    } else {
        next();
    }
};



const generateOTP = () => {
    const otpLength = 6;
    const otp = crypto.randomInt(Math.pow(10, otpLength - 1), Math.pow(10, otpLength));
    return otp.toString();
};

const sendOTP = (mobile, otp) => {
    const message = `Your OTP is ${otp}. Please use it to complete your signup`;
    console.log(" accountSid:", process.env.ACCOUNT_SID);
console.log("authToken :", process.env.AUTH_TOKEN);
    const accountSid = process.env.ACCOUNT_SID;
    const authToken = process.env.AUTH_TOKEN;
    const client = twilio(accountSid, authToken);

    client.messages.create({
        body: message,
        from: "+19252737146",
        to: mobile
    })
    .then(message => console.log('OTP sent', message.sid))
    .catch(error => console.log("Error sending OTP:", error));
};

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

module.exports.otpVerify = async (req, res, next) => {
    try {
        const { mobile } = req.body;
        console.log(req.body);

        const user = await userDB.findOne({ mobile });

        if (user) {
            const otp = generateOTP();
            sendOTP(mobile, otp);
            req.session.userId = user.email;

            userUtils.saveOtpToDatabase(mobile, otp);

            next();
        } else {
            console.log("Enter a valid phone number");
            res.render('otpAuth', { message: "Enter a valid phone number" });
        }
    } catch (e) {
        console.error("Error in otp page:", e.message);
    }
};

module.exports.otpValidate = async (req, res, next) => {
    const userOtp = req.body.otp;
  
    const user = await userDB.findOne({ otp: userOtp });

    if (user) {
        next();
    } else {
        // Destroy session here
        res.render('otpAuth', { message: "Invalid OTP! Try again" });
        req.session.destroy();
    }
};

