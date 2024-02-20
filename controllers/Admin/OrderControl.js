const Order = require("../../model/orderModel");
const Products = require('../../model/productModel');
const userDB = require("../../model/userdetails_model");

exports.getOrderList = async (req, res) => {
  try {
    const itemsPerPage = 6; 
    const currentPage = req.query.page ? parseInt(req.query.page) : 1;

    const pipeline = [
      {
        $lookup: {
          from: 'user_details', // Ensure this matches your actual collection name
          localField: 'user',
          foreignField: '_id',
          as: 'user'
        }    
      },
      { $unwind: '$user' },
      { $unwind: '$orderItems' },
      {
        $lookup: {
          from: 'products', // Ensure this matches your actual collection name
          localField: 'orderItems.product_id',
          foreignField: '_id',
          as: 'product'
        }
      },
      {
        $group: {
          _id: '$orderId',
          user: { $first: '$user' },
          orderId: { $first: '$orderId' },
          orderItems: { $push: '$orderItems' },
          totalAmount: { $first: '$totalAmount' },
          purchaseDate: { $first: '$purchaseDate' },
          deliveryDate: { $first: '$deliveryDate' },
          paymentMethod: { $first: '$paymentMethod' }
        }
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
          paymentMethod: 1
        }
      }
    ];

    const orderLists = await Order.aggregate(pipeline);

    // Calculate total items and total pages for pagination
    const totalItems = orderLists.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Calculate the startIndex and endIndex to load exactly 'itemsPerPage' items
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Slice the array to get items for the current page, ensuring 'itemsPerPage' items
    const itemsToShow = orderLists.slice(startIndex, endIndex);

    // Render the page with the necessary data
    res.render('orderManagement', {
      items: itemsToShow, // Pass the itemsToShow array explicitly
      totalPages: totalPages,
      currentPage: currentPage,
    });
    
  } catch (err) {
    console.error("getOrderList", err.message);
    res.status(500).send("Internal Server Error");
  }
};
