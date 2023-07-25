const mongoose = require("mongoose");

exports.databaseconnection = () => {
  try {
    mongoose.connect('mongodb+srv://mohit123:mohit123@mohit.tjed4.mongodb.net/api?retryWrites=true&w=majority);
    console.log("Connected Database");
  } catch (err) {
    console.log("Database ERROE >...", err.message);
  }
};
