const mongoose = require('mongoose')


const CategorySchema = new mongoose.Schema({
    
    categoryName:{
        type: String,
        required:true,
        lowercase: true
    },
    image:{
        type:String,
        // required:true
    },
    description:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        default:0
    },
    isList:{
        type:Boolean,
        default:true,
    }
    
    
    
    
})
const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
