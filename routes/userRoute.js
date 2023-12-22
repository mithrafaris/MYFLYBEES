const express = require('express');
const user_route = express.Router();
const viewcontroll = require("../controllers/viewcontroller");
const userauth = require("../middleware/usermiddleware");
const userlogincontrol = require("../controllers/User/userlogincontol");
const usersigncontrol = require("../controllers/User/usersigncontrol");
const middleware = require("../middleware/usermiddleware");
const userhomecontrol = require("../controllers/User/homecontrol");
const errorHandle = require("../middleware/errorHandle");
const productDetailController=require("../controllers/User/productDetailController")
const productController=require("../controllers/User/productcontroller")


user_route.get('/', userhomecontrol.getHome);
user_route.get('/logout', viewcontroll.logout);

// user login
user_route.get('/user_login', userauth.is_logout, viewcontroll.user_login);
user_route.post('/user_login', userauth.is_logout, userlogincontrol.loginUser);

// usersignup
user_route.get('/user_signup',viewcontroll.user_signup);
user_route.post('/register', usersigncontrol.post_signup);
user_route.get('/product',productController.getProducts)
//productdetail
user_route.get('/product-detail',errorHandle.errorHandler,productDetailController.getProductDetail)
user_route.post('/product-detail', productDetailController.postCartItem);
// user_route.post('/add-to-cart', productDetailController.postAddTocart)


//cart
user_route.get('/cart',userhomecontrol.getCart)









module.exports = user_route;
