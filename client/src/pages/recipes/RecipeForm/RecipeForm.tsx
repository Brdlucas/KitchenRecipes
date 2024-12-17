import { useState } from "react";
import "./recipeForm.css";
function RecipeForm() {
  const [selectedImage, setSelectedImage] = useState<string>();
  const [category, setCategory] = useState<string[]>([]);
  const [ingredient, setIngredient] = useState<string[]>([]);
  const [info, setInfo] = useState<React.ReactNode | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    persons: 0,
    preparationTime: 0,
    cooking: 0,
    preparation: "",
  });

  const [categoryText, setCategoryText] = useState("");
  const [ingredientText, setIngredientText] = useState("");
  const [categoryInfo, setCategoryInfo] = useState("");

  const handleKeyDownCategory = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      if (categoryText) {
        if (category.length > 5 || categoryText.length > 8) {
          e.preventDefault();
          return setCategoryInfo(
            "vous ne pouvez pas avoir plus de 5 catégories et le text ne doit pas dépasser 8 lettres"
          );
        } else {
          setCategoryInfo("");
          setCategory([...category, categoryText]);
        }
      } else {
        return;
      }
      e.preventDefault();
    }
  };

  const handleKeyDownIngredients = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      if (ingredientText) {
        setCategoryInfo("");
        setIngredient([...ingredient, ingredientText]);
      } else {
        return;
      }
      e.preventDefault();
    }
  };

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInfo("");

    const dataToSend = {
      ...formData,
      category: category,
      ingredients: ingredient,
    };

    const isValid = (value: unknown) => {
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === "number") return true; // Considère 0 comme valide
      return value !== "" && value != null && value !== undefined;
    };
    const allFieldsFilled = Object.values(dataToSend).every(isValid);

    if (allFieldsFilled) {
      try {
        const response = await fetch("http://localhost:3000/recipes/post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
        });
        const data = await response.json();

        setFormData({
          title: "",
          description: "",
          persons: 0,
          preparationTime: 0,
          cooking: 0,
          preparation: "",
        });
        setCategory([]);
        setIngredient([]);
        setCategoryText("");
        setIngredientText("");

        return setInfo(<p className="InfoGreen">recette ajoutée</p>), data;
      } catch (error) {
        console.error(error);
      }
    }
    return setInfo(
      <p className="InfoRed">des éléments obligatoire ne sont pas remplie</p>
    );
  };

  return (
    <div className="form-section">
      <div className="form-div">
        <div className="img-content">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              setSelectedImage(file ? URL.createObjectURL(file) : undefined);
            }}
          />
          <div className="img-div-container">
            {selectedImage && <img src={selectedImage} alt={selectedImage} />}
          </div>
        </div>
        <form className="form-container" onSubmit={handleSubmit}>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="titre"
            value={formData.title}
            onChange={handleChange}
          />
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
          <div className="tags-inputs">
            <div className="tags-ul">
              <ul>
                {ingredient
                  ? ingredient.map((element, index) => (
                      <li key={index}>
                        <p>{element}</p>
                        <p>x</p>
                      </li>
                    ))
                  : null}
              </ul>
            </div>
            <input
              type="text"
              id="ingredient"
              placeholder="ingrédients"
              value={ingredientText}
              onChange={(e) => setIngredientText(e.target.value)}
              onKeyDown={handleKeyDownIngredients}
            />
          </div>
          {categoryInfo && <p className="error">{categoryInfo}</p>}
          <div className="tags-inputs">
            <div className="tags-ul">
              <ul>
                {category
                  ? category.map((element, index) => (
                      <li key={index}>
                        <p>{element}</p>
                        <p>x</p>
                      </li>
                    ))
                  : null}
              </ul>
            </div>
            <input
              type="text"
              id="category"
              placeholder="catégories"
              onChange={(e) => setCategoryText(e.target.value)}
              onKeyDown={handleKeyDownCategory}
              value={categoryText}
            />
          </div>
          <textarea
            name="preparation"
            id="preparation"
            placeholder="Préparation"
            onChange={handleChange}
            value={formData.preparation}
          ></textarea>
          {info}
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}

export default RecipeForm;
