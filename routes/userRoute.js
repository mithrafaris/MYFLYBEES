const express = require('express');
const user_route = express.Router();
const viewcontroll = require("../controllers/viewcontroller");
const userauth = require("../middleware/middleware")



user_route.get('/', viewcontroll.homeRoutes);
user_route.get('/user', viewcontroll.otpmessage);
user_route.get('/about', viewcontroll.about);
user_route.get('/contact', viewcontroll.contact);
user_route.get('/product_details', viewcontroll.product_details);
user_route.get('/product', viewcontroll.product);
user_route.get('/shoping_cart', viewcontroll.shoping_cart);
user_route.get('/otpmessage', viewcontroll.otpmessage);

//user login
const uselogincontrol = require("../controllers/User/userlogincontrol");
user_route.get('/user_login',userauth.is_logout, viewcontroll.user_login);
user_route.post('/user_login',userauth.is_logout, uselogincontrol.loginUser);


//usersignup
const usersigncontrol = require("../controllers/User/usersigncontrol");
user_route.get('/user_signup', viewcontroll.user_signup);
user_route.post('/register', usersigncontrol.post_signup);

user_route.get('/otp', viewcontroll.otp);

module.exports = user_route;
