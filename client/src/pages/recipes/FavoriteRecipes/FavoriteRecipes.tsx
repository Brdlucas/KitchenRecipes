import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import "../RecipeList/Recipes.css";

function FavoriteRecipes() {
  const [favorites, setFavorites] = useState<Favorite[] | null>(null);

  useEffect(() => {
    getFavorites();
  }, []);

  const getFavorites = async () => {
    const response = await fetch("http://localhost:3000/recipes/favorites");
    const data = await response.json();
    setFavorites(data);
  };

  interface Favorite {
    _id: string;
    title: string;
    cooking: number;
    persons: number;
    favorite: boolean;
    preparation: string;
    description: string;
    preparationTime: string;
    category: Array<string>;
    ingredient: Array<string>;
  }

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
      return getFavorites(), data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="favorite-section">
      <div className="recipe-card">
        {favorites &&
          favorites.map((favorite) => (
            <div key={favorite._id} className="recipe-card__content">
              <FaHeart
                className={`heart-icon ${favorite.favorite && "red"}`}
                onClick={() => {
                  updateRecipes(favorite._id, !favorite.favorite);
                }}
              />
              <NavLink
                to={`/recipes/${favorite._id}`}
                className={"linkrecipes"}
              >
                <div className="recipe-card__details">
                  <p>{favorite.title}</p>
                  <p>
                    {favorite.preparationTime + favorite.cooking} minutes /{" "}
                    {favorite.persons} personnes
                  </p>
                  <div>
                    {favorite.category.map((category, index) => (
                      <p key={index}>{category}, </p>
                    ))}
                  </div>
                </div>
              </NavLink>
            </div>
          ))}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
