const router = require("express").Router();
const { Recipe, User } = require("../models");
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
    console.log("user console log",req.user)
    // Pass serialized data and session flag into template
    res.render("homepage", {
      recipes,
      user:req.user,
      logged_in:req.isAuthenticated(),
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile", async (req, res) => {
  try {
    const userData = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Recipe }],
    });
    const user = userData.get({ plain: true });
    console.log("test log for",user)
    // const userData = await User
    // console.log(user.passport.user.id)
    // const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));
    res.render("profile",{
      logged_in:req.isAuthenticated(),
      ...user
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.get("/addrecipe", async (req, res) => {
  try {
    res.render("addRecipe",{
      logged_in:req.isAuthenticated(),
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/recipe/:id", async (req, res) => {
  try {
    const recipeData = await Recipe.findByPk(req.params.id);
    const recipe = recipeData.get({plain:true});

    res.render("recipe",{
      ...recipe,
      logged_in:req.isAuthenticated(),
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
      ...editRecipe,
      logged_in:req.isAuthenticated(),
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
