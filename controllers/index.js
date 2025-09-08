
const User = require("../models/user.model")
const bcrypt = require('bcrypt');

exports.signupPage=(req,res)=>{
    return res.render('./pages/signup');
}

exports.signup=async(req,res)=>{
    try {
        console.log(req.body);        
        req.body.password = await bcrypt.hash(req.body.password,10);
        await User.create(req.body);
        console.log("User created.");    
        return res.redirect('/login');    
    } catch (error) {
        console.log(error.message);
        
    }
}

exports.homePage=(req,res)=>{
    console.log(req.user);    
    return res.render('index');
}

exports.loginPage=(req,res)=>{
    return res.render('./pages/login');
}

exports.logout=(req,res)=>{
    req.logOut(()=>{
        return res.redirect('/');
    })
}
// middleware/auth.js
module.exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login"); // redirect to login if not authenticated
};

