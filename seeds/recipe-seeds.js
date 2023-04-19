const { Recipe } = require('../models')

const recipeData = [
    {
        recipe_name: 'Pizza',
        description: 'This pizza is good',
        ingredients: ['1 Cup of pizza'],
        instructions:'preheat over'
    },
];

const seedRecipes = () => Recipe.bulkCreate(recipeData);

module.exports = seedRecipes;



