const User = require("../models/user.model");


// GET Profile Page
module.exports.getProfile = (req, res) => {
  res.render("profile", { user: req.user });
};

// GET Edit Profile Page
module.exports.getEditProfile = (req, res) => {
  res.render("settings", { user: req.user });
};

// POST Update Profile
module.exports.postEditProfile = async (req, res) => {
  try {
    const { username, email, avatar } = req.body;

    await User.findByIdAndUpdate(req.user._id, {
      username,
      email,
      avatar,
    });

    // update current session values too
    req.user.username = username;
    req.user.email = email;
    req.user.avatar = avatar;

    res.redirect("/profile");
  } catch (error) {
    console.error(error);
    res.redirect("/settings");
  }
};

module.exports.postEditProfile = async (req, res) => {
  try {
    console.log(req.body)
    const { username, email } = req.body;

    let updateData = { username, email };

    if (req.file) {
      updateData.avatar = "/uploads/" + req.file.filename;
    }

    const user = await User.findByIdAndUpdate(req.user._id, updateData, { new: true });

    // update session values
    req.user.username = user.username;
    req.user.email = user.email;
    req.user.avatar = user.avatar;

    res.redirect("/profile");
  } catch (error) {
    console.error(error);
    res.redirect("/settings");
  }
};