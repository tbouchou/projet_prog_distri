const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const path = require("path");
const moment = require("moment");
var fs = require("fs");
// Load Product model
const Product = require("../models/Product");
// Load User model
const User = require("../models/User");
// Load Bid model
const Bid = require("../models/Bid");
// DB Config
const db = require("../config/keys").mongoURI;

var formidable = require("formidable");

const { forwardAuthenticated } = require("../config/auth");
const { ensureAuthenticated } = require("../config/auth");
const { response } = require("express");

// Login Page
router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

// Register Page
router.get("/register", forwardAuthenticated, (req, res) =>
  res.render("register")
);

// Auction Page
router.get("/auction", ensureAuthenticated, (req, res) => {
  res.render("auction");
});

// Register
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "Email already exists" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                req.flash(
                  "success_msg",
                  "You are now registered and can log in"
                );
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});

// Auction
router.post("/auction", (req, res) => {
  // Chargement images - A travailler
  /*const formidable = require('formidable');
  const form = formidable({ multiples: true });
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    console.log("FIELDS : " +fields);
    console.log("FILES : " +files);
  });*/

  var userid = req.user._id;
  var productObject = req.body;
  var productOperations = require("../controllers/usersoperations");
  productOperations.addProduct(productObject, res, userid);
  res.redirect("/dashboard");
});

router.post("/bid/:id", (req, res) => {
  var productId = req.params.id;
  var userid = req.user._id;
  var parBidAmount = req.body.newAmount;


  Bid.find({ pid: productId }, function (err, results) {
    if (err) {
      console.log(err);
      res.redirect("/dashboard");
    }
    if (!results.length) {
      var bidOperations = require("../controllers/usersoperations");
      bidOperations.bidOnProduct(productId, userid, parBidAmount);
      res.redirect("/dashboard");
    } else {
      const maxQuery = Bid.find({ pid: productId })
        .sort({ bidamount: -1 })
        .limit(1)
        .then((bids) => bids[0].bidamount);
      maxQuery.then(function (result) {
        if (parBidAmount <= result) {
          res.redirect("/dashboard?error=badAmount&max="+result);
        } else {
          var bidOperations = require("../controllers/usersoperations");
          bidOperations.bidOnProduct(productId, userid, parBidAmount);
          res.redirect("/dashboard");
        }
      });
    }
  });
});

module.exports = router;
