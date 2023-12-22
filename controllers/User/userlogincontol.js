const userDB = require("../../model/userdetails_model");
const bcrypt = require("bcrypt");



exports.loginUser = async (req, res) => {
  try {
    const user = await userDB.findOne({
      email: req.body.email,
      isadmin: false,
    });

    if (!user) {
      console.log("User not found");
      return res.redirect("/user_login");
    }

    const passwordMatch = await bcrypt.compare(req.body.password, user.password);

    if (passwordMatch) {
      req.session.userId = user.email;
      console.log(req.session.userId);
      res.redirect("/");
    } else {
      console.log("Incorrect password");
      res.redirect("/user_login");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.redirect("/user_login");
  }
};

// exports.forgetpassword = async (req, res) => {
//   console.log(req.body.mobile);
//   try {
//       const Number = await userDB.findOne({ mobile: req.body.mobile });

//       if (!Number) {
//           console.log("User not found");
//           return res.redirect("/user_login");
//       } else {
//           console.log("User available");      
//       }
//   } catch (error) {
//       console.error("Error during login:", error);
//       res.redirect("/otpmessage");
//   }
// }








exports.logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    } else {
      console.log("Session destroyed");
    }
    res.redirect("/user_login");
  });
};


  