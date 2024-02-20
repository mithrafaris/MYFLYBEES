// Import required modules
const mongoose = require('mongoose');
const Order = require("../../model/orderModel");
const Product = require("../../model/productModel");
const userDB = require("../../model/userdetails_model");
const Razorpay = require('razorpay');

// Define the getOrders function
exports.getOrders = async (req, res) => {
  try {
    // Find the user based on the session email
    const user = await userDB.findOne({ email: req.session.userId });
    
    // If user is not found, handle the error
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Define the aggregation pipeline
    const pipeline = [
      {
        $match: {
          user: user._id,
        },
      },
      {
        $lookup: {
          from: "user_details",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $unwind: "$orderItems",
      },
      {
        $lookup: {
          from: "Products",
          localField: "orderItems.product_id",
          foreignField: "_id",
          as: "orderItems.product",
        },
      },
      {
        $sort: {
          purchaseDate: -1,
        },
      },
      {
        $group: {
          _id: "$orderId",
          user: { $first: "$user" },
          orderId: { $first: "$orderId" },
          orderItems: { $push: "$orderItems" },
          totalAmount: { $first: "$totalAmount" },
          purchaseDate: { $first: "$purchaseDate" },
          deliveryDate: { $first: "$deliveryDate" },
          paymentMethod: { $first: "$paymentMethod" },
          address: { $first: "$address" },
        },
      },
      {
        $project: {
          _id: 0,
          user: 1,
          orderId: 1,
          orderItems: 1,
          totalAmount: 1,
          purchaseDate: 1,
          deliveryDate: 1,
          paymentMethod: 1,
          address: 1,
        },
      },
    ];

    // Aggregate orders based on the pipeline
    const orderLists = await Order.aggregate(pipeline);

    // Calculate pagination
    const itemsPerPage = 2;
    const totalItems = orderLists.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const currentPage = req.query.page ? parseInt(req.query.page) : 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToShow = orderLists.slice(startIndex, endIndex);

    // Render the orders page with data
    res.render("orders", {
        items: itemsToShow, // Pass the itemsToShow array explicitly
        totalPages: totalPages,
        currentPage: currentPage,
    });
  } catch (err) {
    // Handle errors
    console.error("getOrders", err.message);
    res.status(500).send("Internal Server Error");
  }
};
