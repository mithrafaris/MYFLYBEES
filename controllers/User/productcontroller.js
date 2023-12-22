const Category = require("../../model/category");
const Products = require("../../model/productModel");
const userDB = require("../../model/userdetails_model");

exports.getProducts = async (req, res) => {
  try {
    const products = await Products.aggregate([
      {
        $match: {
          isList: true,
        },
      },
    ]);
    const categoryList = await Category.aggregate([
      {
        $match: {
          isList: true,
        },
      },
    ]);
    const user = await userDB.findOne({ email: req.session.userId });
    console.log("getProducts -- products", products);
    res.render('product', { products, user, category: categoryList });
  } catch (err) {
    console.error("getProducts ===> ", err.message);
  }
};

exports.postProductSearch = async (req, res) => {
  try {
    console.log(req.body);
    const user = await userDB.findOne({ email: req.session.userId });
    const categoryList = await Category.aggregate([
      {
        $match: {
          isList: true,
        },
      },
    ]);
    const searchQuery = new RegExp("^" + req.body.search, "i");
    console.log(req.body.search);
    const products = await Products.find({ productName: { $regex: searchQuery }, isList: true });
    const p = await Products.find({});
    if (products.length === 0) {
      res.render('product', { products: p, user, category: categoryList });
    } else {
      res.render('product', { products, user, category: categoryList });
    }
  } catch (err) {
    console.error("postProductSearch ===> ", err.message);
  }
};
