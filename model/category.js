const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    
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
const category = mongoose.model("category", categorySchema);
module.exports = category;
