const router = require("express").Router();
const { Recipe } = require("../models");
const passport = require("../passport/strategies");

// post route, posts new recipe
router.post('/', async (req, res) => {
    try{ 
        const newRecipe = await Recipe.create({
            user_id:req.user.id,
            ...req.body,
           
        });
        res.status(200).json(newRecipe);
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
});

//get all recipes for homepage
router.get('/', (req, res) => {
    Recipe.findAll().then((recipeData) => {
        res.json(recipeData);
    });
});

//get recipe by ID
router.get('/:id', (req, res) => {
    try {
    Recipe.findByPk(req.params.id).then((recipeData) => {
        res.json(recipeData);
    });

    if (!recipeData) {
        res.status(404).json({ message: 'No recipe found with that ID'});
        return;
    }

    res.status(200).json(recipeData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get recipes by User ID for profile page


//delete route, deletes recipe
router.delete('/:id', async (req, res) => {
    try {
        const recipeData = await Recipe.destroy({
            where: {
                id: req.params.id,
                user_id: req.user.id
            },
        });

        if (!recipeData) {
            res.status(404).json({ message: 'No recipe found with this id!'});
            return;
        }

        res.status(200).json(recipeData);
    } catch(err) {
        res.status(500).json(err);
    }
    
});

router.put('/:id', async (req, res) => {
    try{ 
        const newRecipe = await Recipe.update({
            
            ...req.body,
           
        }, 
            {
                where: {
                id: req.params.id,
            }
        }
        );
        res.status(200).json(newRecipe);
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
});

module.exports = router;
