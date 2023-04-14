const router = require("express").Router();
// confirm
// const router = require('passport');
const { User } = require("../../models");

//add passport here?

router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    // req.session.save(() => {
    //   req.session.user_id = userData.id;
    //   req.session.logged_in = true;

    res.status(200).json(userData);
    // });
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
