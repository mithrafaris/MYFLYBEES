const mongoose = require('mongoose')
const bannerSchema= new mongoose.Schema({
 bannerName:{
            type: String,
             required:true,
            lowercase: true
            },
            image:{
                 type:String,
                        // required:true
                 },
             title:{
                        type:String,
                        required:true,
                    },
              subtitle:{
                        type:String,
                        required:true,
                    },
                   
             isList:{
                        type:Boolean,
                        default:true,
                    }
                    // products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
                    
                    
                    
                })
                const Banner = mongoose.model('Banner',bannerSchema)
                module.exports=Banner   
            


