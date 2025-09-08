
const passport = require("passport");
const bcrypt = require('bcrypt');
const User = require("../models/user.model");
const LocalStrategy = require('passport-local').Strategy;


passport.use('local',new LocalStrategy(async(username,password,done)=>{
    try {
        let user = await User.findOne({username});

        if(!user) return done(null,false);
        
        let isValid = await bcrypt.compare(password,user.password);

        if(!isValid) return done(null,false);
        return done(null,user);
    } catch (error) {
        return done(error,false);
    }
}));

passport.serializeUser((user,done)=>{
    return done(null,user.id);
});

passport.deserializeUser(async(id,done)=>{
    let user = await User.findById(id);
    return done(null,user);
});

passport.userAuth = (req,res,next)=>{
    console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
     res.locals.user = req.user;
     return next();
    }
    return res.redirect('/login');
}

module.exports = passport;
