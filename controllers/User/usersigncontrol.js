const Products = require("../../model/productModel");
const userDB = require("../../model/userdetails_model");
const Category = require("../../model/categoryModel");

const bcrypt = require("bcrypt");

exports.getOtp = async (req, res) => {
  res.render("otpAuth");
};

exports.post_signup = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password, mobile, repeatPassword } = req.body;
    let existing = await userDB.find({
      $or: [{ email: email }, { mobile: mobile }],
    });

    if (existing.length === 0) {
      if (repeatPassword !== password) {
        console.log("not match");
        res.render("user_login", { message: "Password do not match" });
      } else if (!mobile.match(/^[6789]\d{9}$/)) {
        console.log("new number");
        res.render("user_login", { message: "Invalid mobile number" });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);

        await userDB.insertMany([
          {
            name: name,
            email: email,
            password: hashedPassword,
            mobile: mobile,
          },
        ]);

        console.log("User created successfully");
        res.redirect("/otplogin");
      }
    } else {
      res.render("user_login", { message: "User already exists" });
    }
  } catch (error) {
    console.error("postSignup", error.message);
    res.render("user_login", { message: "An error occurred during signup" });
  }
};
exports.postOtp = async (req, res) => {
  res.redirect("/otpVerify");
};
exports.getOtpVerify = async (req, res) => {
  res.render("otpVerify");
};
exports.postOtpVerify = async (req, res) => {
  const userOtp = req.body.otp;
  const user = await userDB.findOne({ otp: userOtp });
  // const user =await User.findOne({otp:userOtp},{$unse})
  console.log("otpverify", req.session);
  const products = await Products.find({});
  const categories = await Category.find({});
  if (user) {
    user.otp = 0;
    req.session.userId = user.email;
    res.redirect("/");
    res.render("home", {
      user: user,
      products: products,
      category: categories,
    });
  }
};
