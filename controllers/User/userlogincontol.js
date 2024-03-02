const userDB = require("../../model/userdetails_model");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const userUtils = require('../../utils/userUtils');

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("log in success");

    const user = await userDB.findOne({ email });

    if (!user) {
      console.log("User not found");
      return res.render('user_login', { message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      if (user.isBlock) {
        return res.render('user_login', { message: "Your account is blocked. Please contact support." });
      } else {
        req.session.userId = user.email;
        return res.redirect('/');
      }
    } else {
      return res.render('user_login', { message: "Invalid email or password" });
    }
  } catch (e) {
    console.log("postlogin", e.message);
    return res.render('user_login', { message: "An error occurred during login" });
  }
};

exports.getForgot = async (req, res) => {
  res.render('forgot');
}

exports.postForgot = async (req, res) => {
  const userEmail = req.body.email;
  const resetToken = userUtils.generateToken();
  userUtils.saveResetTokenToDatabase(userEmail, resetToken);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mithrafaris31@gmail.com', // Enter your Gmail address here
      pass: '121kc24027' // Enter your Gmail password here
    }
  });

  const mailOptions = {
    from: 'your_email@gmail.com',
    to: userEmail,
    subject: 'Password Reset',
    text: `Click the following link to reset your password: http://localhost:3000/resetPassword?token=${resetToken}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error.message);
      res.render('forgot', { message: 'Error sending password reset email' });
    } else {
      console.log('Email sent: ' + info.response);
      res.render('forgot', { emailLink: true });
    }
  });
}

exports.getResetPassword = async (req, res) => {
  const resetToken = req.query.token;

  if (resetToken) {
    const user = await userDB.findOne({ resetToken: resetToken });

    if (user) {
      res.render('resetPass');
    } else {
      res.render('forgot', { message: 'Invalid or expired reset token. Try again!' });
    }
  } else {
    res.render('forgot', { message: 'Invalid or expired reset token. Try again!' });
  }
}

exports.postResetPassword = async (req, res) => {
  const resetToken = req.query.token;
  const newPassword = req.body.newPassword;
  const confirmPassword = req.body.confirmPassword;

  if (resetToken) {
    const user = await userDB.findOneAndUpdate(
      { resetToken: resetToken },
      { $set: { password: newPassword, resetToken: undefined } },
      { new: true }
    );

    if (user) {
      if (newPassword === confirmPassword) {
        res.render('user_login', { passwordMessage: 'Password reset successfully' });
      } else {
        res.render('resetPass', { message: 'New password and confirm password do not match' });
      }
    } else {
      res.render('resetPass', { message: 'Invalid reset token' });
    }
  } else {
    res.render('resetPass', { message: 'Invalid reset token' });
  }
}
