const Recipe = require("./recipe");
const User = require("./user");

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL, { dialect: "mysql" });
}

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
