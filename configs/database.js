const { default: mongoose } = require("mongoose")

const db=async()=>{
    try {
        await mongoose.connect('mongodb+srv://p6579113:12345@cluster0.zlavh0m.mongodb.net/admin-blog-passport');
        console.log("Database connected Successfully");
    } catch (error) {
        console.log(error.message);
    }
}
module.exports=db;