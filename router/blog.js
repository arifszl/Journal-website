const express = require('express');
const router = express.Router();
const blogController = require("../controller/blog");
const userController = require("../controller/user");

router.get("/", blogController.homeController);
router.get("/compose", userController.composeController);
router.post("/compose", userController.postCompose);
router.get("/post/:blogid", blogController.postController);


router.get("/edit/:blogid", blogController.editblogController);





router.post("/update", blogController.updateblogController);

router.post("/delete", blogController.deleteblogControler);




module.exports = router;