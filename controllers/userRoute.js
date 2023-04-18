const router = require("express").Router();
// confirm
const passport = require("../passport/strategies");
//const localStrategy = require('passport-local');
const { User } = require("../../models");

//add passport here?

router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);
    req.login(userData, function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
