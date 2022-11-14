const Blog = require("../model/blog")

exports.homeController = async(req, res) => {


    const blogs = await Blog.find();

    res.render("home", { newposts: blogs })


}

exports.postController = (req, res) => {


    const reqblogid = req.params.blogid;
    console.log(reqblogid);

    const blog = Blog.findById(reqblogid, (err, blog) => {
        if (err)
            console.log(err);
        else {
            res.render("post", { tit: blog.title, top: blog.content, id: blog._id })
        }
    })

}


exports.editblogController = (req, res) => {

    // console.log(req.params.blogid);
    const reqblogid = req.params.blogid;
    Blog.findById(reqblogid, function(err, blog) {
        res.render("edit", { top: blog.content, id: reqblogid })

    });

}
exports.updateblogController = async(req, res) => {

    const id = req.body.upd;
    const cont = req.body.text;
    console.log(cont);

    Blog.findByIdAndUpdate(id, { content: cont }, function(err, docs) {
        if (err)
            console.log(err);
        else {
            console.log(docs);
        }
    })
    res.redirect("/");

}

exports.deleteblogControler = async(req, res) => {


    const id = req.body.del;
    Blog.findByIdAndRemove(id, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Removed Successfully");
        }

    });
    res.redirect("/");

}