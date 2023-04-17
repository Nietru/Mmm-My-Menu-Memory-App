const { Measurements } = require('../models')

const measurementData = [
    {
        measurement_units: 'Can',
        qty_amount: 1,
        ingredient_id: 1,
        recipe_id: 1,
    },
    {
        measurement_units: 'Cup',
        qty_amount: 2,
        ingredient_id: 2,
        recipe_id: 1
    },
    {
        measurement_units: 'Package',
        qty_amount: 1,
        ingredient_id: 3,
        recipe_id: 1
    },
    {
        measurement_units: 'Cup',
        qty_amount: 1,
        recipe_id: 1,
        ingredient_id: 4
    },
];

const seedMeasurements = () => Measurements.afterBulkCreate(measurementData);

module.exports = seedMeasurements;