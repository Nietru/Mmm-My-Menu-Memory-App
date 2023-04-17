// login authentification route via passportjs strategy
// const express = require("express");
// const router = express.Router();
// const passport = require("../passport/strategies");

// router.get("/login", function (req, res, next) {
//   res.render("login");
// });

// router.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/login",
//   })
// );

// module.exports = router;
const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.logged_in) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = withAuth;
