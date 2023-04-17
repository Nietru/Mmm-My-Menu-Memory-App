const { Recipe } = require('../models')

const recipeData = [
    {
        recipe_name: 'Pizza',
        description: 'This pizza is good'
    },
];

const seedRecipes = () => Recipe.bulkCreate(recipeData);

module.exports = seedRecipes;



