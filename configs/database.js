const { default: mongoose } = require("mongoose")

const db=async()=>{
    try {
        await mongoose.connect('mongodb+srv://aksharparekh401:12345@cluster0.ncwztql.mongodb.net/admin-blog-passport');
        console.log("Database connected Successfully");
    } catch (error) {
        console.log(error.message);
    }
}
module.exports=db;