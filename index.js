const express = require('express');
const bodyParser = require('body-parser');
const LocalStrategy = require('./middlewares/passport');
const session = require('express-session');
const passport = require('passport');
const db = require('./configs/database');
const port = 8081;
const app = express();
const path = require('path')

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use(session({
    secret:'Abcd',
    resave:false,
    saveUninitialized:false,
    cookie : {maxAge: 1000*60*60}
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/',require('./routes'));
app.get('/tables',(req,res)=>{
    return res.render('./pages/tables')
})
app.get('/forms',(req,res)=>{
    return res.render('./pages/form-basic')
})

app.listen(port,(err)=>{
    if(!err){
        db();
        console.log("server start");
        console.log(`http://localhost:${port}`);
                
    }
})