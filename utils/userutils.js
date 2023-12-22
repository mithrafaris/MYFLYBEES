const crypto=require('crypto');
const userDB= require("../model/userdetails_model")
exports.generateToken=()=>{
            const token = crypto.randomBytes(32).toString('hex')
            return token
        }
 exports.saveResetTokenToDatabase=async(email,resetToken)=>{
            const user= await  userDB.findOneAndUpdate({email:email},{resetToken:resetToken})
            if(user){
              console.log("Reset token saved to user's record ");
            }
          }

exports.saveOtpToDatabase=async(phone,otp)=>{
            const user= await  userDB.findOneAndUpdate({phone:phone},{otp:otp})
            if(user){
              console.log("otp is saved to user's record ");
            }
          }
exports.securePassword = async(pass)=>{
            try{
                const passHash = await bcrypt.hash(pass,10)
                return passHash
            }catch(e){
                console.log("password err",err);
            }
          }