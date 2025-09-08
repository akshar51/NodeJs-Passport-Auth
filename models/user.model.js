
const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String
})

const User = mongoose.model('userData',userSchema);

module.exports = User;
