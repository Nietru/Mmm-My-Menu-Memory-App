const passport = require("passport");
const serializer = require("./serializer");
//adding middleware
serializer(passport);
const strategies = require("./strategies");
//adding middleware
strategies(passport);

module.exports = passport;
