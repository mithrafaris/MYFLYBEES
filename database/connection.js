const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URL);
    console.log(`mongoDB connection:${con.connection.host}`);
  } catch (error) {
    console.log("Error connecting mongoDb");
    process.exit(1);
  }
};
module.exports = connectDB;
