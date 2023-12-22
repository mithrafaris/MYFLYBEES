const User = require('../model/userdetails_model')
exports.is_login=(req,res,next)=>{
            if(req.session.userId){
                        console.log("user exist")
                        next()
            }else{
                        console.log("user illa")
                        res.redirect("/user_login")
            }
}
exports.is_logout=(req,res,next)=>{
            if(req.session.userId){
                       
            
                        res.redirect("/logout")
            }else{
                        
                        next()
            }
}


