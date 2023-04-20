const router = require("express").Router();
const recipeRoute = require("./recipeRoutes")
// const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");
const authRoutes = require("./auth");
const htmlRoutes = require("./htmlRoutes");

// html routes
router.use("/", homeRoutes);
// auth routes
router.use("/auth", authRoutes);
// router.use("/api", apiRoutes);
router.use("/", htmlRoutes);

router.use("/recipe",recipeRoute);
module.exports = router;
