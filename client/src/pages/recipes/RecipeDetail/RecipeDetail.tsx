import { useState, useEffect, useReducer } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./RecipeDetail.css";
import { FaHeart } from "react-icons/fa6";
import Recipes from "../../../components/recipes/Recipes";

function RecipeDetail() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const navigate = useNavigate();
  const { id } = useParams();

  interface Recipe {
    _id: string;
    title: string;
    description: string;
    preparation: string;
    category: Array<string>;
    ingredients: Array<string>;
    persons: number;
    favorite: boolean;
    preparationTime: number;
    cooking: number;
  }

  useEffect(() => {
    getRecipe();
    getRecipes();
  }, [id]);

  const getRecipe = async () => {
    try {
      const response = await fetch(`http://localhost:3000/recipes/${id}`);
      if (!response.ok) {
        navigate("/");
        return;
      }
      const data = await response.json();
      setRecipe(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getRecipes = async () => {
    try {
      const response = await fetch(`http://localhost:3000/recipes/`);
      if (!response.ok) {
        navigate("/");
        return;
      }
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
      console.log(data);
      return getRecipe();
    } catch (error) {
      console.log(error);
    }
  };

  const initialState = { recipes: [] };

  interface RecipeState {
    recipes: Recipe[];
  }

  interface DeleteRecipeAction {
    type: "DELETE_RECIPE";
    payload: string;
  }

  type RecipeAction = DeleteRecipeAction;

  const recipeReducer = (state: RecipeState, action: RecipeAction) => {
    switch (action.type) {
      case "DELETE_RECIPE":
        return {
          ...state,
          recipes: state.recipes.filter(
            (recipe) => recipe._id !== action.payload
          ),
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(recipeReducer, initialState);

  const deleteRecipe = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/recipes/delete/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        dispatch({ type: "DELETE_RECIPE", payload: id });
        navigate("/recipes");
      } else {
        console.error("Erreur lors de la suppression de la recette");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  return (
    recipe && (
      <div className="recipeID-section">
        <h1 className="recipeID-title">
          {recipe.title}{" "}
          <FaHeart
            className={`heart-icon ${recipe.favorite && "red"}`}
            onClick={() => updateRecipes(recipe._id, !recipe.favorite)}
          />
          -
          <p
            onClick={() => deleteRecipe(recipe._id)}
            style={{ cursor: "pointer", color: "red" }}
          >
            supprimer
          </p>
        </h1>
        <div className="recipeID-img"></div>
        <div className="recipeID-Info">
          <p>Préparation : {recipe.preparationTime} min</p>
          {recipe.cooking === 0 ? null : <p>Cuisson : {recipe.cooking} min</p>}
          <p>Total : {recipe.cooking + recipe.preparationTime} min</p>
        </div>
        <div className="recipeID-description">
          <h2>Description</h2>
          <p>{recipe.description}</p>
        </div>
        <div className="recipeID-ingredients">
          <h2>Ingrédients</h2>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}, &nbsp;</li>
            ))}
          </ul>
        </div>
        <div className="recipeID-description">
          <h2>Préparation</h2>
          <p>{recipe.preparation}</p>
          <p>{recipe.category.join(", ")}</p>
        </div>
        <div className="recipeID-grid">
          <Recipes renderType={"filter"} valueFilter={recipe.category[0]} />
        </div>
      </div>
    )
  );
}

export default RecipeDetail;
