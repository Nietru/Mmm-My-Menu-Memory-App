const Recipe = require('./recipe');
const Ingredients = require('./ingredients');
const Measurements = require('./measurements');
const MeasurementQty = require('./measurementQty');

Ingredients.belongsTo(Recipe, {
    foreignKey: 'recipe_id'
});

Recipe.hasMany(Ingredients, {
    foreignKey: 'recipe_id',
    onDelete: 'SET NULL',
});
