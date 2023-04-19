const sequelize = require("../config/connection");
const { User, Recipe } = require("../models");

const userData = require("./userData.json");
const recipeData = require("./recipe-seeds.js");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await recipeData();

  process.exit(0);
};

seedDatabase();
