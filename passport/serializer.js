var User = require("../models/user");

// Tells sequelize how to use the User in a request/response.
module.exports = function (passport) {
  passport.serializeUser(function (email, done) {
    User.findOne({ where: { email: email } }).then(function (user) {
      done(null, { id: user.id, username: user.name });
    });
  });
  // convert it back to what it was...
  passport.deserializeUser(function (_user, done) {
    console.log("USER", _user);
    User.findByPk(_user.id).then(function (user) {
      if (user) {
        done(null, { id: user.id, username: user.name });
      } else {
        done(user.errors, null);
      }
    });
  });
};
