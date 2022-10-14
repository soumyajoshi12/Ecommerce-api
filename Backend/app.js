const express = require("express");
const app = express();

// Route imports
const product = require("./routes/productRoute");
app.use(express.json());  
app.use(express.urlencoded({ extended: false }));

app.use("/",product);

module.exports = app;