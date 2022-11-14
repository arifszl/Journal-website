const express = require('express');
const router = express.Router();



router.get("/login", function(req, res) {
    res.render("login");
})
router.get("/register", function(req, res) {
    res.render("register");
})


router.post("/register", function(req, res) {
    const email = req.body.username;
    const pass = req.body.password;

    const newUser = new User({
        email: email,
        password: pass
    })
    newUser.save(function(err) {
        if (err)
            console.log(err);
        else {
            res.render("/")
        }
    });
});


module.exports = router;