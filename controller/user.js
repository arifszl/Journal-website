const Blog = require("../model/blog");

exports.composeController = (req, res) => {
    res.render("compose");
}

exports.postCompose = (req, res) => {
    console.log(req.body.postboy);
    const title = req.body.posttitle;
    const content = req.body.postboy;

    const blogs = new Blog({
        title: title,
        content: content
    })
    blogs.save();
    res.redirect("/");
}