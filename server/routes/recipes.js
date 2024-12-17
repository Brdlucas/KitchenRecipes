const express = require("express");
const router = express.Router();
const {
  getRecipes,
  addRecipe,
  getRecipe,
  filterRecipes,
  getFavorites,
  updateFavorites,
  searchfilterRecipes,
  deleteRecipe,
} = require("../controllers/recipesController");

router.get("/favorites", getFavorites);
router.get("/", getRecipes);
router.get("/:id", getRecipe);
router.post("/post", addRecipe);
router.post("/searchfilter", searchfilterRecipes);
router.post("/filter", filterRecipes);
router.patch("/update/:id", updateFavorites);
router.delete("/delete/:id", deleteRecipe);

module.exports = router;
