const blog = require("../models/blogModel");
const User = require("../models/userModel");
const passport = require("../middlewares/passportMiddleWare");
const fs = require("fs");
const path = require("path");

const { error } = require("console");
require("dotenv").config();

module.exports.loginSuccess = (req, res) => {
  req.flash("success", "login Successful");
  return res.redirect("/home");
};

module.exports.openHomePage = async (req, res) => {
  try {
    const blogs = await blog.find();
    return res.render("./client/home.ejs", { blogs });
  } catch (err) {
    console.log(err);
    res.send("Error in opening home page");
  }
};

module.exports.openCreateBlogPage = (req, res) => {
  res.render("./client/createBlog.ejs");
};


module.exports.submitBlog = async (req, res) => {
  try {
    await blog.create({ ...req.body, coverImage: req.file.filename });

    console.log("Blog submitted in the database successfully");

    return res.redirect("/home");
  } catch (err) {
    console.log(err);
    res.send("Error in submitting blog");
  }
};

module.exports.deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const BlogToDelete = await blog.findById(id);
    if (!BlogToDelete) {
      return res.send("Blog not found");
    }
    await blog.findByIdAndDelete(req.params.id);
    console.log("Blog deleted successfully");
    return res.redirect("/home");
  } catch (err) {
    console.log(err);
    res.send("Error in deleting blog");
  }
};

module.exports.openEditPage = async (req, res) => {
  const { id } = req.params;
  try {
    const blogToEdit = await blog.findById(id);
    if (!blogToEdit) {
      return res.send("Blog not found");
    }
    return res.render("./client/edit.ejs", { blogToEdit });
  } catch (err) {
    console.log(err);
    res.send("Error in opening edit page");
  }
};

module.exports.submitEdit = async (req, res) => {
  const { id } = req.params;
  try {
    const blogToEdit = await blog.findById(id);
    if (!blogToEdit) {
      console.log("Blog not found");
      return res.send("Blog not found");
    }

    let updatedData = { ...req.body };

    if (req.file) {
      const oldImagePath = path.join(
        __dirname,
        "../uploads",
        blogToEdit.coverImage
      );
      console.log("Trying to delete:", oldImagePath);

      fs.unlink(oldImagePath, (err) => {
        if (err) {
          console.error("Error deleting old image:", err.message);
        } else {
          console.log("Old image deleted successfully");
        }
      });

      updatedData.coverImage = req.file.filename;
    }

    await blog.findByIdAndUpdate(id, updatedData);
    console.log("Blog submitted successfully");

    return res.redirect("/home");
  } catch (err) {
    console.log(err);
    res.send("Error in submitting edit");
  }
};


module.exports.openSignupPage = (req, res) => {
  res.render("./client/signup.ejs");
};


module.exports.submitSignup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userinDatabase = await User.findOne({ email: email });
    if (userinDatabase) {
      return res.redirect("/signup");
    }
    await User.create({ username, email, password });
    console.log("User signed up successfully");

    return res.redirect("/login");
  } catch (err) {
    console.log(err);
    res.send("Error in submitting signup");
  }
};


module.exports.openLoginPage = (req, res) => {
  res.render("./client/login.ejs");
};

//open single blog
module.exports.singleBlogPage = async (req, res) => {
  const { id } = req.params;
  try {
    const blogtodisplay = await blog.findById(id);
    res.render("./client/singleBlogPage.ejs", { blogtodisplay });
  } catch (err) {
    console.log(err);
  }
};


module.exports.logout = (req, res) => {
  req.logOut(() => {
    req.flash("success", "logged out");
    return res.redirect("/login");
  });
};

module.exports.myProfile = (req, res) => {
  return res.render("./client/myProfile.ejs");
};



module.exports.openChangePasswordPage = (req, res) => {
  return res.render("./client/changePassword.ejs");
};

module.exports.changePassword = async (req, res) => {
  try {
    let email = JSON.parse(req.cookies.email);
    let user = await User.findOne({ email: email });

    let { new_password, confirm_password } = req.body;

    if (new_password === confirm_password) {
      user.password = new_password;
      await user.save();
    //   return res.json({ message: "Password changed successfully" });
    req.flash("success", "Password Changed Successfully");
    return res.redirect("/login")
    } else {
    //   return res.json({ message: "Passwords dont match" });
    req.flash("error", "Passwords do not match!")
    return res.redirect("/changePassword")
    }


  } catch (err) {
    return res.json({ message: error.message });
  }
};
