const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Measurements_units extends Model {}

Measurements_units.init(
    {
        measurement_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        measurement_description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'measurement_units',
      }
);

module.exports = Measurements_units;