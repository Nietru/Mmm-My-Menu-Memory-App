const Recipe = require("./recipe");
const User = require("./user");

User.hasMany(Recipe, {
  foreignKey: "user_id",
});

Recipe.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = {
  User,
  Recipe,
};
