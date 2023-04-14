const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class Ingredients extends Model {}

Ingredients.init(
  {
    ingredient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    ingredient_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //TODO: doesnt need recipe_id?  t.t.
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
    modelName: "ingredients",
  }
);

module.exports = Ingredients;
