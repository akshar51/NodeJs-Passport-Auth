    const express = require('express');
    const router = express.Router();
    const blogController = require('../controller/blogController');
    const redirectTohomePage = require('../middlewares/redirectTohomePage');
    const upload = require('../middlewares/imageUpload');
    const passport = require("../middlewares/passportMiddleWare");
    const change_pass = require('../middlewares/changePassMiddleware');
    
    
    router.get('/signup', blogController.openSignupPage);
    router.post('/signup', blogController.submitSignup);

    router.get('/login', blogController.openLoginPage);
    router.post("/login",
        passport.authenticate("local", 
            {
                failureRedirect:"/login", 
                failureFlash:"login Failed"
            }
        ), 
            blogController.loginSuccess
        );
    

    router.get("/changePassword", change_pass, blogController.openChangePasswordPage)
    router.post("/changePassword",change_pass, blogController.changePassword); 




    router.use(passport.userAuth); 

    router.get('/', redirectTohomePage);
    router.get('/home', blogController.openHomePage);

    router.get('/createBlog', blogController.openCreateBlogPage);
    router.post('/createBlog',upload, blogController.submitBlog);

    router.get('/deleteBlog/:id', blogController.deleteBlog);

    router.get('/editBlog/:id', blogController.openEditPage);
    router.post('/editBlog/:id', upload, blogController.submitEdit);

    router.get('/singleBlogPage/:id', blogController.singleBlogPage);

    router.get('/myProfile', blogController.myProfile);


    router.get("/logout", blogController.logout);

    module.exports = router;