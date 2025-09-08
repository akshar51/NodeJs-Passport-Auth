const express = require('express');

const bodyParser = require('body-parser');
const LocalStrategy = require('./middlewares/passport');
const session = require('express-session');
const passport = require('passport');
const db = require('./configs/database');
const port = 8081;
const app = express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
    secret:'Dhaval',
    resave:false,
    saveUninitialized:false,
    cookie : {maxAge: 1000*60*60}
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));

app.use('/',require('./routes'));

app.listen(port,(err)=>{
    if(!err){
        db();
        console.log("server start");
        console.log(`http://localhost:${port}`);
                
    }
})