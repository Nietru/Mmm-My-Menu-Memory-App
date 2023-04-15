const Recipe = require("./recipe");
const Ingredients = require("./ingredients");
const Measurements = require("./measurements");
const User = require("./user");

User.hasMany(Recipe, {
  foreignKey: "recipe_id",
});

Recipe.belongsTo(User, {
  foreignKey: "user_id",
});

Recipe.hasMany(Ingredients, {
  foreignKey: "recipe_id",
  onDelete: "SET NULL",
});

Ingredients.belongsTo(Recipe, {
  foreignKey: "recipe_id",
});



Ingredients.belongsTo(Measurements,{
    foreignKey: 'ingredient_id'


});

module.exports -
  {
    User,
    Recipe,
    Ingredients,
    Measurements,
  };
