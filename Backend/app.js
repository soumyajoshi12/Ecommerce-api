const express = require("express");
const app = express();
const cookiePaser = require("cookie-parser")

app.use(express.json());  
app.use(cookiePaser())

app.use(express.urlencoded({ extended: false }));
// Route imports
const product = require("./routes/productRoute");
const User = require("./routes/userRoute");


app.use("/",product);
app.use("/", User);

module.exports = app;