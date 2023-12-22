const userDB=require("../../model/userdetails_model")
const products=require("../../model/productModel")

 exports.getProductDetail= async(req,res)=>{
  try{
      const id= req.query.id
      const product = await products.findOne({_id:id})
      const user = await userDB.findOne({email:req.session.userId})
      res.render('productDetail',{product,user:user})
  }catch(err){
  console.error("getProductDetail",err.message);
  }
      
  
  }

 exports.postCartItem = async(req,res)=>{
    try{ 
        const { productId, count } = req.body;
         console.log("Message received from frontend:", productId, count, req.session.userId);
        
        const product = await products.findOne({ _id: productId });
       
          if (req.session.userId) {
            const user = await userDB.findOne({ email: req.session.userId }, { cart: 1, _id: 0 });
            let data = user;
            let { cart } = data;
         
            let found = false;
          
            for (const item of cart) {
              const { productId } = item;
              if (productId === req.body.productId) {
                found = true;
                break;
              }
            }
          
            if (found) {
              await userDB.updateOne(
                  { email: req.session.userId, "cart.productId": req.body.productId },
                  { $inc: { "cart.$.count": parseInt(count) } } // Increment the count by the given value
                );
             res.render('productDetail', { product, message: "already carted" });
              res.send(JSON.stringify( "count"));
            } else {
              await userDB.updateOne({ email: req.session.userId }, {
                $push: { cart: { count: Number(req.body.count), productId: req.body.productId } }
              });
             
              res.send(JSON.stringify({remove:true,message: " carted" }));
            }
          }
          else if(req.session.userId === undefined){
            res.send(JSON.stringify({message: " carted" }));
              }
                  
        
          
    }catch(err){
        console.error("postCartItem",err.message);
    }
}

// exports.postAddTocart=async(req,res)=>{
//   try {
    
//       const { quantity, productId } = req.body;
//        await userDB.updateOne({email:req.session.userId},{$addToSet:{
//           cart:{count:quantity,productId:productId}
//       }})
//      res.redirect('/product-detail')
  

//     } catch (err) {
//       console.error("Error adding item to cart:", err.message);
//       res.status(500).json({ success: false, message: 'Failed to add item to cart' });
//     }
// }
