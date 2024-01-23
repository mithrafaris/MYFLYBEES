const Category = require("../../model/categoryModel");
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
    const CategoryList = await Category.aggregate([
      {
        $match: {
          isList: true,
        },
      },
    ]);
    const user = await userDB.findOne({ email: req.session.userId });
    console.log("getProducts -- products", products);
    res.render("product", { products, user,  categories: CategoryList });
  } catch (err) {
    console.error("getProducts ===> ", err.message);
  }
};
