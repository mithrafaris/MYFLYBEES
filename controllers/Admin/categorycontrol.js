const userDB = require("../../model/userdetails_model");
const Category = require("../../model/category");

exports.getCategoryList = async (req, res) => {
  try {
    const cat = await Category.aggregate([
      {
        $match: {
          isList: true,
        },
      },
    ]);
    if (cat) {
      const itemsPerPage = 6; // Set the desired number of items per page
      const currentPage = req.query.page ? parseInt(req.query.page) : 1;
      const totalItems = cat.length;
      const totalPages = Math.ceil(totalItems / itemsPerPage);

      // Calculate the startIndex and endIndex to load exactly 'itemsPerPage' items
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      // Slice the array to get items for the current page, ensuring 'itemsPerPage' items
      const itemsToShow = cat.slice(startIndex, endIndex);

      res.render("categoryManagement", {
        categories: cat,
        items: itemsToShow,

        totalPages: totalPages,
        currentPage: currentPage,
      });
    }
  } catch (err) {
    console.error("getCategoryList", err);
  }
};
exports.getCategoryDelete = async (req, res) => {
  try {
    const id = req.query.id;
    console.log(id);
    await Category.findOneAndUpdate({ _id: id }, { $set: { isList: false } });

    res.redirect("/admin/category");
  } catch (err) {
    console.error(err);
  }
};
exports.getCategoryEditModal = async (req, res) => {
  try {
    const id = req.query.id;
    const category = await Category.findOne({ _id: id });
    console.log(category);
    res.render("editCategory", { check: category });
  } catch (err) {
    console.error(err);
  }
};

//
exports.postCategoryListEdit = async (req, res) => {
  try {
    console.log("ith function ann");
    const catId = req.body;
    console.log(req.body);
    const category = await Category.findOneAndUpdate(
      { _id: catId },
      {
        categoryName: req.body.categoryName,
        image: req.file.filename,
      }
    );
    console.log(category);
    res.redirect("/admin/category");
  } catch (err) {
    console.error(err);
  }
};

exports.getCategoryAddCat = async (req, res) => {
  res.render("addCategory");
};

exports.postCategoryAddCat = async (req, res) => {
  console.log(req.body);

  try {
    const existing = await Category.findOne({
      categoryName: req.body.categoryName,
    });

    if (existing) {
      res.render("addCategory", { message: "Category already exists" });
    } else {
      // const arrImages = [];
      // for (let i = 0; i < req.files.length; i++) {
      //     arrImages[i] = req.files[i].filename;
      // }

      const category = await Category.insertMany([
        {
          categoryName: req.body.categoryName,
          description: req.body.description,

          image: req.file.filename,
        },
      ]);

      res.redirect("/admin/category");
    }
  } catch (err) {
    console.error("add product", err.message);
  }

  // try{
  //     console.log(req.body.categoryName);
  //     const existing =await Category.findOne({categoryName:req.body.categoryName})
  //     console.log("existing",existing);
  //     if(existing){

  //              res.render('addCategory',{message:"Category already exists"})

  //     }else {
  //         // await Category.insertMany([{

  //         //     categoryName:req.body.categoryName,
  //         //     description:req.body.description,
  //         //     image:req.file.filename
  //         // }])
  //          res.redirect('/admin/category')

  //     }

  // }catch(err){
  //     console.error(err);
  // }
};
exports.getSearch = async (req, res) => {
  const searchQuery = new RegExp("^" + req.body.search, "i"); // Adding "i" flag for case-insensitive search

  Category.find({ categoryName: { $regex: searchQuery }, isList: true }).then(
    (cat) => {
      if (cat.length === 0) {
        res.render("categoryManagement", { categories: [] });
      } else {
        res.render("categoryManagement", { categories: cat });
      }
    }
  );
};

exports.postCategoryListEdit = (req, res) => {
  try {
    // Ensure that req.file is defined before accessing its properties
    if (!req.file || !req.file.filename) {
      throw new Error("File not uploaded properly");
    }

    // Your logic here
    const filename = req.file.filename;
    // Rest of your code

    res.status(200).send("File uploaded successfully");
  } catch (error) {
    console.error(error);
    res.status(400).send("Error uploading file");
  }
};
