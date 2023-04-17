var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.uuid);
  });

  passport.deserializeUser(function (uuid, done) {
    db.Accounts.findById(uuid).then(function (user) {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });
};
