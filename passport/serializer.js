var User = require("../models/user");

// Tells sequelize how to use the User in a request/response.
module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, { id: user.id, username: user.name });
  });
  // convert it back to what it was...
  passport.deserializeUser(function ({ id }, done) {
    console.log(id);
    User.findByPk(id).then(function (user) {
      if (user) {
        done(null, { id: user.id, username: user.name });
      } else {
        done(user.errors, null);
      }
    });
  });
};
