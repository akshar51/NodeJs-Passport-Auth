
const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    avatar: { type: String, default: "/assets/images/users/1.jpg" }
})

const User = mongoose.model('userData',userSchema);

module.exports = User;
