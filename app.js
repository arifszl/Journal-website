require('dotenv').config();
require("./db/db")
const express = require("express");
var _ = require("lodash");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const encrypt = require("mongoose-encryption");
const blogRouter = require('./router/blog');
const adminRouter = require("./router/admin");
const authRouter = require("./router/auth");
const Blog = require("./model/blog");

//     <-- fix part for mongoose -->
const mongoose = require("mongoose");


const MONGODB_URI = "mongodb://localhost:27017/BlogDB";





// Defining model for the schema



const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(blogRouter);

app.use(adminRouter);
app.use(authRouter);

app.listen(8000, function() {
    console.log("Listening at 8000");
})