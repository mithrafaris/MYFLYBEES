const express = require('express');
const user_route = express.Router();
const viewcontroll = require("../controllers/viewcontroller");
const userauth = require("../middleware/usermiddleware");
const userlogincontrol = require("../controllers/User/userlogincontol");
const usersigncontrol = require("../controllers/User/usersigncontrol");
const userhomecontrol = require("../controllers/User/homecontrol");
const errorHandle = require("../middleware/errorHandle");
const productDetailController=require("../controllers/User/productDetailController")
const productController=require("../controllers/User/productcontroller")
const filterCatController=require("../controllers/User/filterCatController")



user_route.get('/', userhomecontrol.getHome);
user_route.get('/user_login',userauth.isLogin,viewcontroll.user_login)
user_route.post('/user_login',userauth.isLogin,userlogincontrol.loginUser)
//otp
user_route.get('/otplogin',userauth.isLogin,usersigncontrol.getOtp)
user_route.post('/otplogin',userauth.otpVerify,usersigncontrol.postOtp)
user_route.get('/otpVerify',userauth.isLogin,usersigncontrol.getOtpVerify)
user_route.post('/otpVerify',userauth.otpValidate,usersigncontrol.postOtpVerify)


// usersignup
user_route.get('/user_signup',viewcontroll.user_signup);
user_route.post('/register', usersigncontrol.post_signup);
user_route.get('/product',productController.getProducts)

//productdetail
user_route.get('/product-detail',errorHandle.errorHandler,productDetailController.getProductDetail)
user_route.get('/filter-cat',filterCatController.getFilterCat)

user_route.post('/filter-cat',filterCatController.postFiltercat)












user_route.get('/logout',(req,res)=>{
    req.session.userId = null
    res.redirect('/')
})

module.exports = user_route;
