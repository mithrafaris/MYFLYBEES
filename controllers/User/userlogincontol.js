const userDB = require("../../model/userdetails_model");
const bcrypt = require("bcrypt");

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("log in success");

    const user = await userDB.findOne({email});

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
