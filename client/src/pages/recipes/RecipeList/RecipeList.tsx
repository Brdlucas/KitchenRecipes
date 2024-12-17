import "./Recipes.css";
import { useState } from "react";
import Recipes from "../../../components/recipes/Recipes";

function RecipeList() {
  const [getValue, setGetValue] = useState("");

  return (
    <div className="recipes-section">
      <select
        name="filter"
        id="recipes-filter"
        onChange={(e) => setGetValue(e.target.value)}
      >
        <option>Filtrer</option>
        <option value="italien">italien</option>
        <option value="entrée">entrée</option>
        <option value="déjeuner">déjeuner</option>
      </select>
      {getValue === "Filtrer" ? null : (
        <h1 className="recipes-category">{getValue}</h1>
      )}
      <div>
        <Recipes renderType={"filter"} valueFilter={getValue} />
      </div>
    </div>
  );
}

export default RecipeList;
