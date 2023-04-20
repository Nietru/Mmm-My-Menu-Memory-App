var User = require("../models/user");

// Tells sequelize how to use the User in a request/response.
module.exports = function (passport) {
  passport.serializeUser(function (req, user, done) {
    //stores user to the session
    console.log("SERIALIZE:", user);
    User.findOne({ where: { email: user.email } }).then(function (user) {
      done(null, { id: user.id, email: user.email, username: user.name });
    });
  });
  // convert it back to what it was...
  passport.deserializeUser(function (_user, done) {
    console.log("USER", _user);

    done(null, _user);
  });
};
