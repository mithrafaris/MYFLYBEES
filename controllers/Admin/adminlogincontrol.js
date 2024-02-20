const userDB = require("../../model/userdetails_model");
const bcrypt = require("bcrypt");

exports.Adminlogin = async (req, res) => {
  try {
   
    const {email, password } = req.body;

    const user = await userDB.findOne({ email:email, isadmin: true });

    console.log(user);
    if (!user) {
      return res.status(401).send("User not found");
    }

    console.log(user.password);

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Redirect to the admin dashboard upon successful login
      return res.redirect("/admin/dashboard");
    } else {
      return res.status(401).send("Invalid email or password");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
                       