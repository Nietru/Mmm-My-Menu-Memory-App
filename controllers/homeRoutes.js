const router = require("express").Router();
const { Recipe } = require("../models");

//feature/homeroutes
router.get('/', async (req, res) => {
    try {
      
      const recipeData = await Recipe.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  
      
      const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('homepage', { 
        recipes, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;

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

module.exports = router;
//main
