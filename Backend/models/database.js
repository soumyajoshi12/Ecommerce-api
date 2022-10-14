const mongoose = require("mongoose");

exports.databaseconnection = () => {
  try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected Database");
  } catch (err) {
    console.log("Database ERROE >...", err.message);
  }
};
