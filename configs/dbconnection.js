const mongoose = require('mongoose');

require('dotenv').config();
const url = process.env.DB_URL;

const db = async()=>{
    try{
        await mongoose.connect("mongodb+srv://aksharparekh401:12345@cluster0.ncwztql.mongodb.net/passport-blog");
        console.log("Database connected");
    }catch(err){
        console.log(err.message);
      
    }
}

module.exports = db;