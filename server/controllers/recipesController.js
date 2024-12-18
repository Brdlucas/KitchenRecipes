const Recipes = require("../Schema/Recipes");

const getRecipes = async (req, res) => {
  const recipes = await Recipes.find();

  if (!recipes) {
    return res.status(404);
  }

  return res.json(recipes);
};

const getRecipe = async (req, res) => {
  const id = req.params.id;

  try {
    const recipe = await Recipes.findById(id);

    if (!recipe) {
      return res.redirect("/new-page");
    }

    res.json(recipe);
  } catch (error) {
    return res.redirect("/");
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipes.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return res.status(404);
    }

    res.json(recipe);
  } catch (error) {}
};

const searchfilterRecipes = async (req, res) => {
  try {
    const recipes = await Recipes.find();

    const filterRecipe = recipes.filter((recipe) => {
      return Object.keys(req.body).every(
        (key) =>
          recipe[key] &&
          recipe[key].toLowerCase().includes(req.body[key].toLowerCase())
      );
    });

    if (filterRecipe.length === 0) {
      return res.status(404).send("Aucune recette trouvée");
    }

    res.json(filterRecipe);
  } catch (error) {
    console.error("Erreur lors du filtrage des recettes:", error);
    res.status(500).send("Erreur serveur lors du filtrage des recettes");
  }
};

const filterRecipes = async (req, res) => {
  const recipes = await Recipes.find();
  const filterRecipe = recipes.filter((recipe) =>
    recipe.category.some((category) => category === req.body.value)
  );

  if (filterRecipe) {
    return res.json(filterRecipe);
  }
};

const addRecipe = (req, res) => {
  const recipe = Recipes.create(req.body);

  if (!recipe) {
    return res.status(404).send("erreur");
  }

  res.json(recipe);
};

const getFavorites = async (req, res) => {
  try {
    const favorites = await Recipes.find({ favorite: true });

    if (!favorites) {
      return res.status(404);
    }
    return res.json(favorites);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erreur serveur", error: error.message });
  }
};

const updateFavorites = async (req, res) => {
  const id = req.params.id;

  const favorite = await Recipes.findOneAndUpdate(
    { _id: id },
    { favorite: req.body.value },
    { new: true }
  );

  res.json(favorite);
};

module.exports = {
  getRecipes,
  getRecipe,
  addRecipe,
  filterRecipes,
  getFavorites,
  updateFavorites,
  searchfilterRecipes,
  deleteRecipe,
};
