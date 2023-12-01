const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  name:{
    type:String
  },
  email: {
    type: String,
  },
  mobile: {
    type: String,
  },

  password: {
    type: String,
  },
  isBlock: {
    type: Boolean,
    default: false,
   
  },
  isadmin: {
    type: Boolean,
    default: false,
  },
});

const userDB = mongoose.model("user_details", Schema);
module.exports = userDB;
