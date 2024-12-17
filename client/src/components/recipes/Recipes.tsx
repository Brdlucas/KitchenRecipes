import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import DefaultList from "../../pages/recipes/RecipeList/DefaultList";

interface RecipesProps {
  renderType: string;
  valueFilter?: string;
  recipes?: string[];
  recipe?: string[];
}

function Recipes({ renderType, valueFilter }: RecipesProps) {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [filter, setFilter] = useState<Recipe[]>([]);

  interface Recipe {
    _id: string;
    title: string;
    cooking: number;
    persons: number;
    favorite: boolean;
    preparation: string;
    description: string;
    preparationTime: string;
    category: Array<string>;
    ingredients: Array<string>;
    recipes: string[];
    recipe: string[];
  }

  useEffect(() => {
    getRecipes();
    if (valueFilter) {
      getFilter();
    }
  }, [valueFilter]);

  const getRecipes = async () => {
    try {
      const response = await fetch("http://localhost:3000/recipes/");
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateRecipes = async (id: string, isTrue: boolean) => {
    try {
      const response = await fetch(
        `http://localhost:3000/recipes/update/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value: isTrue }),
        }
      );
      const data = await response.json();
      return getRecipes(), getFilter(), data;
    } catch (error) {
      console.log(error);
    }
  };

  const getFilter = async () => {
    const response = await fetch(`http://localhost:3000/recipes/filter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: valueFilter }),
    });
    const data = await response.json();
    setFilter(data);
  };

  const GetMap = ({ recipe }: { recipe: Recipe }) => {
    return (
      <div className="recipe-card__content">
        <FaHeart
          className={`heart-icon ${recipe.favorite && "red"}`}
          onClick={() => {
            updateRecipes(recipe._id, !recipe.favorite);
          }}
        />
        <NavLink to={`/recipes/${recipe._id}`} className={"linkrecipes"}>
          <div className="recipe-card__details">
            <p>{recipe.title}</p>
            <p>
              {recipe.preparationTime + recipe.cooking} minutes /{" "}
              {recipe.persons} personnes
            </p>
            <div>
              {recipe.category.map((category, index) => (
                <p key={index}>{category}, </p>
              ))}
            </div>
          </div>
        </NavLink>
      </div>
    );
  };

  return (
    <div className="recipe-card">
      {recipes &&
        recipes.length > 0 &&
        (renderType === "map" ? (
          recipes.map((recipe) => <GetMap key={recipe._id} recipe={recipe} />)
        ) : renderType === "some" ? (
          recipes
            .slice(-4)
            .map((recipe) => <GetMap key={recipe._id} recipe={recipe} />)
        ) : renderType === "filter" ? (
          filter.length > 0 ? (
            filter.map((filter) => <GetMap key={filter._id} recipe={filter} />)
          ) : (
            <DefaultList />
          )
        ) : //

        null)}
    </div>
  );
}

export default Recipes;
