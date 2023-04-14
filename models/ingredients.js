const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Ingredients extends Model {}

Ingredients.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        ingredient_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        recipe_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'recipe',
                key: 'id',
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'ingredients',
      }
);

module.exports = Ingredients;
