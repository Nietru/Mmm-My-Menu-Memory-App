const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Measurement_qty extends Model {}

Measurement_qty.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    // connects the ingredients table to this measurement/qty table
    ingredient_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "ingredient",
        key: "id",
      },
    },
    ingredient_qty: {
      // need to finish this
    },
    unit_measure: {
      // need to finish this
    },
    recipe_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "recipe",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "measurement_qty",
  }
);

module.exports = Measurement_qty;
