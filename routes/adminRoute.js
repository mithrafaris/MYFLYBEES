const express = require("express");
const admin_route = express.Router();
const viewcontroll = require("../controllers/viewcontroller");
const adminlogincontrol = require("../controllers/Admin/adminlogincontrol");
const adminblock = require('../controllers/Admin/adminblockcontrol');
const categorycontrol = require("../controllers/Admin/categorycontrol");
const middleware=require("../middleware/middleware")
const category=require("../model/category")
const multer = require("../middleware/multer")
admin_route.get("/dashboard", viewcontroll.dashboard);
admin_route.post("/dashboard", viewcontroll.dashboard);

admin_route.get("/productsDetails", viewcontroll.productsDetails);
// admin_route.post("/productsDetails", viewcontroll.productsDetails);

// userdetails
admin_route.get("/user_details", viewcontroll.user_details);
admin_route.post("/user_details", viewcontroll.user_details);
admin_route.get('/blockuser', adminblock.blockUser);


admin_route.post("/Adminlogin", adminlogincontrol.Admin_login);
admin_route.get("/Adminlogin", viewcontroll.Adminlogin);



 //category
 admin_route.get("/Category", categorycontrol.getCategoryList);
 admin_route.get("/category/addCategory", categorycontrol.getCategoryAddCat);
 admin_route.post("/category/addCategory", multer.upload.single("file"), categorycontrol.postCategoryAddCat);
 admin_route.get("/category/edit", categorycontrol.getCategoryEditModal);

 admin_route.post("/category/edit", categorycontrol.postCategoryListEdit);
 
 
 admin_route.get("/category/delete", categorycontrol.getCategoryDelete);
 
 admin_route.post("/category/search", categorycontrol.getSearch);
 


module.exports = admin_route;
