const router = require("express").Router();
const { Recipe } = require("../models");
const passport = require("../passport/strategies");

router.get("/", async (req, res) => {
  try {
    const recipeData = await Recipe.findAll({
      // include: [
      //   {
      //     model: User,
      //     attributes: ['name'],
      //   },
      // ],
    });

    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("homepage", {
      recipes,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile", async (req, res) => {
  try {
    // const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));
    console.log(req.session);
    res.render("profile");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/addrecipe", async (req, res) => {
  try {
    res.render("addRecipe");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/recipe/:id", async (req, res) => {
  try {
    const recipeData = await Recipe.findByPk(req.params.id);
    const recipe = recipeData.get({plain:true});

    res.render("recipe",{
      ...recipe
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/editrecipe/:id", async (req, res) => {
  try {
    const editRecipeData = await Recipe.findByPk(req.params.id);
    const editRecipe = editRecipeData.get({plain:true});

    res.render("editrecipe",{
      ...editRecipe
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
