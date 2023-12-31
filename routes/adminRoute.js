const express = require("express");
const admin_route = express.Router();
const viewcontroll = require("../controllers/viewcontroller");
const adminlogincontrol = require("../controllers/Admin/adminlogincontrol");
const adminblock = require('../controllers/Admin/adminblockcontrol');
const categorycontrol = require("../controllers/Admin/categorycontrol");
const middleware=require("../middleware/usermiddleware")
const category=require("../model/category")
const multer = require("../middleware/multer")
const productControl=require("../controllers/Admin/productcontrol")
const bannercontrol = require("../controllers/Admin/bannercontrol")

//dashboard
admin_route.get("/dashboard", viewcontroll.dashboard);
admin_route.post("/dashboard", viewcontroll.dashboard);



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

 admin_route.post("/category/edit", multer.upload.single("file"),categorycontrol.postCategoryListEdit);
 
 
 admin_route.get("/category/delete", categorycontrol.getCategoryDelete);
 
 admin_route.post("/category/search", categorycontrol.getSearch);




 

 //product
 admin_route.get( "/products",productControl.getProductList );
          
//admin_route.post("/products", adminAuth.isAdminLoggedIn);
          
admin_route.get("/products/addProduct",productControl.getAddProduct);
          
admin_route.post( "/products/addProduct",multer.upload.array("file"),productControl.postAddProduct );
          
admin_route.get("/products/edit",productControl.getEditProduct);
          // productController.postEditProduct
 admin_route.post("/products/edit", multer.upload.array("file"),productControl.postEditProduct);
admin_route.get("/products/delete", productControl.getProductDelete);
          
admin_route.get("/product/deleteimage", productControl.deleteImages);
          
 admin_route.post("/products/search", productControl.getSearch);
          
//Banner
admin_route.get('/banner',bannercontrol.getBanner)

admin_route.get('/banner/addBanner',bannercontrol.getAddBanner)

admin_route.post('/banner/addBanner',multer.upload.single("file"),bannercontrol.getPostAddBanner)

admin_route.get('/banner/delete',bannercontrol.getBannerDelete)

admin_route.post('/banner/search',bannercontrol.getBannerSearch)



 

module.exports = admin_route;
