const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Measurements_qty extends Model {}

Measurements_qty.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        qty_amount: {
            type: DataTypes.STRING,
            allowNull: false
        }

    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'measurement_qty',
      }
);

module.exports = Measurements_qty;