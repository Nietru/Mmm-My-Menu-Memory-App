// login authentification route via passportjs strategy
const express = require("express");
const router = express.Router();
// this is the passport instance with configured middleware, grabbed from passport/index
const passport = require("../passport");
const User = require("../models/user");

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);
router.post("/sign-up", async (req, res) => {
  console.log(req.body);
  try {
    const userData = await User.create(req.body);
    req.login(userData.get({ plain: true }), function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  } catch (err) {
    // to see the error in the terminal
    console.error(err);
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.isAuthenticated()) {
    req.logout(function(err) {
      if (err) {
        console.log(err);
      }
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


module.exports = router;
