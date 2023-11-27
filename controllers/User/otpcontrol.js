// const loadOtp = async (req, res) => {

//             const userData = newUser;
//             console.log(userData);
//             const mobile = userData.mobile;
//             newOtp = message.sendMessage(mobile, res);
//             console.log(newOtp);
        
//             const phone = req.body.mno;
//             res.render("otp", { newOtp, userData, mobileNo: phone, message: "" })
//         }
        
// const  verifyOtp = async (req, res) => {
//             try {
//                 const otp = req.body.newotp;
//                 console.log(req.body);
//                 console.log(req.body.otp);
//                 if (otp === req.body.otp) {
//                     const password = await bcrypt.hash(req.body.password, 10)
//                     const user = new User({
//                         name: req.body.name,
//                         email: req.body.email,
//                         mobile: req.body.mno,
//                         password: password
        
//                     })
//                     await user.save().then(() => console.log('register success'));
//                     res.redirect("/user_signup")
//                 }
//                 else {
//                     const userData = newUser;
//                     const phone = req.body.mno;
//                     res.render("otp", { newOtp, userData, mobileNo: phone, message: "invalid otp" })
//                     console.log("otp not match");
//                 }
//             } catch (error) {
//                 console.log(error.message);
//             }
//         }