const express = require("express");
var _ = require("lodash");
const bodyParser = require("body-parser");
const ejs = require("ejs");

//     <-- fix part for mongoose -->
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/blogDB");


// -----Defining Schema------
const blogSchema = new mongoose.Schema({

    title: {
        // <--== Validator for string==-->
        type: String,
        required: [true, "Why no title"]
    },
    content: String,
    //<--validator added-->
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    reveiw: String
});

// Defining model for the schema
const Blog = mongoose.model("Blog", blogSchema);

// Create data for using model
const blog1 = new Blog({
    title: "Day1",
    content: "Hey there welcome to my blog",
    rating: 10,
    review: "good knowledge"
});
const blog2 = new Blog({
    title: "Day2",
    content: "Hey there welcome to my blog",
    rating: 10,
    review: "good knowledge"
});
const blog3 = new Blog({
    title: "Day3",
    content: "Hey there welcome to my blog",
    rating: 10,
    review: "good knowledge"
});
const blog4 = new Blog({
    // title: "Day4",
    content: "Hey there welcome to my blog",
    rating: 10,
    review: "good knowledge"
});
//    <--to save multiple entry-->
// Blog.insertMany([blog1, blog2, blog3], function(err) {
//         if (err)
//             console.log(err);
//         else {
//             console.log("Successfully added");
//         }
//     })
//blog4.save();

//Update datavalue
// Blog.updateOne({ _id: "633890a483173194883623a7" }, { title: "peach" }, function(err) {
//     if (err)
//         console.log(err);
//     else {
//         console.log("Successfully updated")
//     }
// });

//<---...Delete data ...->
// Blog.deleteOne({ title: "peach" }, function(err) {
//     if (err)
//         console.log(err);
//     else {
//         console.log("Sucessfully deleted")
//     }
// })


// <--- To find all data from database-->

Blog.find(function(err, blogs) {
    if (err)
        console.log(err);

    else {
        //  mongoose.connection.close();  (<--For close connection of mongoose-->)
        // console.log(blogs);
        blogs.forEach(function(blog) {
            console.log(blog.title);
        })

    }
})

const authorSchema = new mongoose.Schema({
    Name: String,
    age: Number,
    //adding embedded schema
    favourite_blog: blogSchema
});

const Author = mongoose.model("Author", authorSchema);

const author = new Author({
    Name: "Arif",
    age: 21,
    favourite_blog: blog2
});
//author.save();





var posts = [];
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function(req, res) {
    //send data to web
    res.render("home", { content: homeStartingContent, newpost: posts });
})
app.get("/about", function(req, res) {
    res.render("about", { aboutcontent: aboutContent })
})

app.get("/contact", function(req, res) {
    res.render("contact", { contactcontent: aboutContent })
})
app.get("/compose", function(req, res) {
    res.render("compose");
})


app.post("/compose", function(req, res) {

        const post = {
            title: req.body.posttitle,
            text: req.body.postboy
        };
        posts.push(post);

        res.redirect("/")
    })
    //to make diffrent routes using one route
app.get("/post/:topic", function(req, res) {
    const topic = _.lowerCase(req.params.topic);

    posts.forEach(function(post) {
        const pTitle = _.lowerCase(post.title);
        if (pTitle === topic) {
            res.render("post", { tit: post.title, top: post.text })
        }
    })
})
app.listen(3000, function() {
    console.log("Listening at 3000");
})