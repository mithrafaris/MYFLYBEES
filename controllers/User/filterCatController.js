
const { ObjectId } = require('mongodb');
const userDB = require("../../model/userdetails_model");
const category = require("../../model/categoryModel");
const Products = require('../../model/productModel')
const Banner = require("../../model/banner")

exports.getFilterCat=async(req,res)=>{
    try{
        if(req.query.id!==""){
        const id = new ObjectId(req.query.id);
        console.log(id);
        console.log("------------------------------------------");
        const user =await userDB.findOne({email:req.session.userId})
        const categories = await category.aggregate([
            {
              $match: {
                isList: true
              }
            }
          ]);
        const productsWithCategory = await Products.find({ category: id ,isList:true}).populate('category');

        const productsWithCategoryy = await Products.aggregate([
            {
              $match: {
                category: id
              }
            },
            {
              $lookup: {
                from: 'Category',  // Assuming the collection name for categories is 'categories'
                localField: 'category',
                foreignField: '_id',
                as: 'category'
              }
            },
            {
              $unwind: '$category'
            }
          ]);
          const banner = await Banner.aggregate([
            {
              $match:{
                isList:true
              }
            }
          ])
           res.render('home',{user:user,products:productsWithCategory,category:categories,banner})
        }else{
            
        }
        console.log(productsWithCategoryy);
    }catch(err){
        console.error("getFilterCat ---->",err.message);
    }
}
exports.postFiltercat=async(req,res)=>{
  try{
    console.log(req.body);
    const catname = req.body.catname
    const productsWithCategoryy = await Products.aggregate([
      {
        $match: {
          categoryName:catname
        }
      },
      {
        $lookup: {
          from: 'Category',  // Assuming the collection name for categories is 'categories'
          localField: 'category',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $unwind: '$category'
      }
    ]);
  }catch(err){
    console.error('postFiltercat ----> ',err.message);
  }
}
