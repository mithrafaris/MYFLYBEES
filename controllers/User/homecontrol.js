const userDB = require("../../model/userdetails_model");
const category = require("../../model/category");
const Products = require('../../model/productModel')
const Banner = require("../../model/banner")


exports.getHome = async (req, res) => {
      const getCartItems = async (user) => {
              const cartData = [];
          
              for (const item of user.cart) {
                const user = await userDB.findOne({ email: req.session.userId });
                const product = await Products.findOne({ _id: item.productId });
                if (product) {
                  let total = item.count * product.price;
                  cartData.push({ user: user, count: item.count, product: product, total: total });
                }
              }
          
              return cartData;
            };
          
            try {
              const user = await userDB.findOne({ email: req.session.userId });
              let sub;
              let uniqueCartItems;
          
              if (user) {
                const cartData = await getCartItems(user);
                let totalArr = [];
                cartData.map((item) => {
                  totalArr.push(item.total);
                });
                if (totalArr.length !== 0) {
                  sub = totalArr.reduce((acc, sum) => {
                    return acc + sum;
                  });
                }
          
                uniqueCartItems = cartData.filter((item, index, self) =>
                  index === self.findIndex((t) => t.product && t.product._id.equals(item.product._id))
                );
              }
          
              const productss = await Products.find({ isList: true }).populate('category');
          
              const categories = await category.aggregate([
                {
                  $match: {
                    isList: true,
                  },
                },
              ]);
          
              const banner = await Banner.aggregate([
                {
                  $match: {
                    isList: true,
                  },
                },
              ]);
          
              res.render('home', { user: user, products: productss, category: categories, banner, cart: uniqueCartItems });
            } catch (e) {
              console.error("getHome", e.message);
            }
          };

exports.getCart=async(req,res)=>{

            const getCartItems = async (user) => {
                const cartData = [];
                
                for (const item of user.cart) {
                const user =await userDB.findOne({email:req.session.userId})
                  const product = await Products.findOne({ _id: item.productId });
                  if (product) {
                    let total = item.count * product.price;
                    cartData.push({user:user, count: item.count, product: product,total:total });
                  }
               
        
                }
                return cartData;
              };
              
              try {
                if (req.session.userId) {
        
                  const user = await userDB.findOne({ email: req.session.userId }, { cart: 1, _id: 0 });
            //   console.log(user);
            let sub
                  if (user) {
                    const cartData = await getCartItems(user);
                    let totalArr=[]
                    cartData.map(item=>{
                        totalArr.push(item.total)
                    })
                    if(totalArr.length!==0){
                         sub=totalArr.reduce((acc,sum)=>{return acc+sum})
                    }
                  
                    const uniqueCartItems = cartData.filter((item, index, self) =>
                      index === self.findIndex(t => t.product && t.product._id.equals(item.product._id))
                    );
                   
                    res.render('cart', { user:user,cartItem: uniqueCartItems,subTotal:sub });
                  } else {
                    console.error("getCart: User not found");
                    return res.status(404).send("User not found");
                  }
                }
              } catch (e) {
                console.error("getCart", e.message);
                return res.status(500).send("Internal Server Error");
              }
              
              
              
              
        }

    exports.getProfile= async(req,res)=>{
          try{
              const user =await userDB.findOne({email:req.session.userId})
              res.render('profile',{userdata:user,user:user})
          }catch(err){
              console.error("getProfile",err.message);
          }
      }

    

   