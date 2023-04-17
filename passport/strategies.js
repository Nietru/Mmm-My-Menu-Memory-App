const passport = require("passport");
const LocalStrategy = require("passport-local");

// Define the local strategy for Passport.js
//  ------------------------------------------------------- not sure about this code yet t.t.
passport.use(
  new LocalStrategy(
    {
      // telling passport what keynames to look for in the req.body
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    (email, password, done) => {
      console.log(email);
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
//  ------------------------------------------------------------
module.exports = passport;
