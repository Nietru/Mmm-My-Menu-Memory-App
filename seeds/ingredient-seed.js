const { Ingredients } = require('../models')

const ingredientData = [
    {
        ingredient_name: 'Pizza sauce',
        recipe_id: 1,
        ingredient_id: 1
    },
    {
        ingredient_name: 'Cheese',
        recipe_id: 1,
        ingredient_id: 2
    },
    {
        ingredient_name: 'Pizza dough',
        recipe_id: 1,
        ingredient_id: 3
    },
    {
        ingredient_name: 'Pepperoni',
        recipe_id: 1,
        ingredient_id: 4
    },
];

const seedIngredients = () => Ingredients.bulkCreate(ingredientData);

module.exports = seedIngredients;