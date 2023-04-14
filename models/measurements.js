const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Measurements extends Model {}

Measurements.init(
    {
        measurement_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        measurement_units: {
            type: DataTypes.STRING,
            allowNull: false
        },
        qty_amount: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        ingredient_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'ingredients',
                key: 'id',
            }
        },
        recipe_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'recipe',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'measurement_units',
      }
);

module.exports = Measurements;