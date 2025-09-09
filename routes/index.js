
const { Router } = require("express");
const { homePage, signup, signupPage, loginPage, logout, ensureAuthenticated } = require("../controllers");
const passport = require("passport");
const userController = require("../controllers/userController");
const upload = require("../middlewares/upload");
const router = Router();

router.get('/',passport.userAuth,homePage);

router.get('/signup',signupPage);
router.post('/signup',signup);


router.get('/login',loginPage);
router.post('/login',passport.authenticate('local',{successRedirect:'/',failureRedirect:'/login'}));

router.get('/logout',logout)
router.get("/profile", ensureAuthenticated, (req, res) => {
  res.render("profile", { user: req.user });
});

// Profile page
router.get("/profile", ensureAuthenticated, userController.getProfile);

// Edit Profile page
router.get("/settings", ensureAuthenticated, userController.getEditProfile);

// Save Edit Profile
router.post("/settings",ensureAuthenticated,upload.single("avatar"),userController.postEditProfile);

//Form page
router.get('/form',ensureAuthenticated,userController.formPage)


module.exports = router;
