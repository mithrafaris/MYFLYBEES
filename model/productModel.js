const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        lowercase: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: {
        type: Array,
     
    },
        category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    discount: {
        type: String,
    },
    isList: {
        type: Boolean,
        default: true,
    },
});

const Products = mongoose.model("Products", productSchema);

module.exports = Products;
