const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const User = require("../models/user");
// Define the local strategy for Passport.js
module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      {
        // telling passport what keynames to look for in the req.body
        usernameField: "email",
        passwordField: "password",
        // passReqToCallback: true,
      },
      (email, password, done) => {
        User.findOne({
          where: { email: email },
        })
          .then((user) => {
            if (!user) {
              return done(null, false, { message: "Incorrect email." });
            }

            bcrypt.compare(password, user.password, (err, result) => {
              if (err) {
                return done(err);
              }

              if (!result) {
                return done(null, false, { message: "Incorrect password." });
              }

              return done(null, user);
            });
          })
          .catch((err) => {
            return done(err);
          });
      }
    )
  );
};
