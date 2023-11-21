const userdb=require("../../model/userdetails_model")
const bcrypt = require("bcrypt");

exports.post_signup = async (req, res) => {
  try {
    const { email, password, mobile } = req.body;
    if(!email ||!password||!mobile) {
        return res.status(400).json({message: "Please fill all fields"});
    }
    console.log("post signup");
    
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userdb({
      email,
      password: hashedPassword,
      mobile,
    });

    await newUser
      .save()
      .then(() => {
        console.log("successfully created");
        res.redirect("/user_login");
      })
      .catch((err) => {
        console.log(err.message);
      });
  } catch (error) {
    console.log(error);
  }
};
