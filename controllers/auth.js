// login authentification route via passwordjs strategy
const express = require("express");
const router = express.Router();
const passport = require("../passport/strategies");

router.get("/login", function (req, res, next) {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

module.exports = router;
