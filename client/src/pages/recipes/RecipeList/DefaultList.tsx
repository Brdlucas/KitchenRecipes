import Recipes from "../../../components/recipes/Recipes";

function DefaultList() {
  const categories = ["entrée", "mexicain", "végétarien"]; // Tableau de catégories

  return (
    <div className="defaultList-section">
      {categories.map((category) => (
        <div className="defaultList-category" key={category}>
          <h1>{category} :</h1>
          <Recipes renderType={"filter"} valueFilter={category} />
        </div>
      ))}
    </div>
  );
}

export default DefaultList;
