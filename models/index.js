const Recipe = require("./recipe");
const Ingredients = require("./ingredient");
const Measurements = require("./measurement");
const MeasurementQty = require("./measurement_qty");

Ingredients.belongsTo(Recipe, {
  foreignKey: "recipe_id",
});

Recipe.hasMany(Ingredients, {
  foreignKey: "recipe_id",
  onDelete: "SET NULL",
});

// need to finish this
