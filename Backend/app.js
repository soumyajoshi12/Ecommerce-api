const express = require("express");
const app = express();

app.use(express.json());  

app.use(express.urlencoded({ extended: false }));
// Route imports
const product = require("./routes/productRoute");
const User = require("./routes/userRoute");


app.use("/",product);
app.use("/", User);

module.exports = app;