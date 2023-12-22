const mongoose =require('mongoose');


const couponSchema = new mongoose.Schema({
     userId:[{
      
          type:String,
    

     }],
     couponName:{
        type:String,
        require:true,
        unique: true
     },
     couponValue:{
        type:Number,
        require:true
     },
     expiryDate:{
        type:String,
        require:true
     },
     maxValue:{
        type:Number,
        require:true
     },
     minValue:{
        type:Number,
        require:true
     },
     isList:{
        type:Boolean,
        default:true
     }
    
});

const Coupon  = mongoose.model('Coupon',couponSchema);
exports = Coupon;