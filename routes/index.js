
const { Router } = require("express");
const { homePage, signup, signupPage, loginPage, logout, ensureAuthenticated } = require("../controllers");
const passport = require("passport");

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

module.exports = router;
