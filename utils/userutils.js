const crypto = require('crypto');
const userDB = require("../model/userdetails_model");

exports.generateToken = () => {
  const token = crypto.randomBytes(32).toString('hex');
  return token;
};

exports.saveResetTokenToDatabase = async (email, resetToken) => {
  try {
      const user = await userDB.findOneAndUpdate({ email: email }, { resetToken: resetToken });
      if (user) {
          console.log("Reset token saved to user's record");
      }
  } catch (error) {
      console.error("Error saving reset token:", error.message);
  }
};

exports.saveOtpToDatabase = async (mobile, otp) => {
  try {
      const user = await userDB.findOneAndUpdate({ mobile: mobile }, { otp: otp });
      if (user) {
          console.log("OTP is saved to user's record");
      }
  } catch (error) {
      console.error("Error saving OTP:", error.message);
  }
};