import { NavLink } from "react-router-dom";
import "./Header.css";
import "./responsive-Header.css";
import { useState, useEffect } from "react";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navClass, setNavClass] = useState("nav-hidden");
  const [search, setSearch] = useState<Recipe[]>([]);
  const [filter, setFilter] = useState<Recipe[]>([]);
  const [mapFilter, setMapFilter] = useState<string>("");
  const [isFocused, setIsFocused] = useState(true);

  const toggleIsOpen = () => {
    setIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    setNavClass(isOpen ? "nav-open" : "nav-hidden");
    searchFilter();
  }, [isOpen]);

  const searchFilter = async () => {
    const response = await fetch(`http://localhost:3000/recipes/searchfilter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filter),
    });
    const data = await response.json();
    setSearch(data);
  };

  const handleFilter = (value: string) => {
    if (search.length > 0) {
      const filteredRecipes = search.filter((recipe) => {
        if (recipe.title.toLowerCase().includes(value)) {
          setMapFilter("title");
          return true;
        } else if (recipe.description.toLowerCase().includes(value)) {
          setMapFilter("description");
          return true;
        } else if (
          recipe.category.some((catego) => catego.toLowerCase().includes(value))
        ) {
          setMapFilter("category");
          return true;
        } else if (
          recipe.ingredients.some((ing) => ing.toLowerCase().includes(value))
        ) {
          setMapFilter("ingredients");
          return true;
        }
        return false;
      });

      setFilter(filteredRecipes);
    }
  };

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
  }

  return (
    <nav className="header__global">
      <div className="burger-icon" onClick={toggleIsOpen}>
        <span className="burger-icon-slot"></span>
        <span className="burger-icon-slot"></span>
        <span className="burger-icon-slot"></span>
      </div>
      <NavLink to={"/"} className="logo">
        logo
      </NavLink>
      <div className="navbar__search">
        <input
          type="search"
          className="search-input"
          onChange={(e) => handleFilter(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 100)}
        />
        <div
          className={
            isFocused ? `search-result-active` : "search-result-unactive"
          }
        >
          {isFocused &&
            filter &&
            filter.map((value) => (
              <NavLink
                key={value._id}
                to={`/recipes/${value._id}`}
                className={"link"}
              >
                <ul>
                  <li>
                    {mapFilter === "title" && value.title}
                    {mapFilter === "description" && value.description}
                    {mapFilter === "category" && (
                      <div className="card__details-category">
                        {value.category.map((element, index) => {
                          return <p key={index}>{element},</p>;
                        })}
                      </div>
                    )}
                    {mapFilter === "ingredients" && (
                      <div className="card__details-category">
                        {value.ingredients.map((element, index) => {
                          return <p key={index}>{element},</p>;
                        })}
                      </div>
                    )}
                  </li>
                </ul>
              </NavLink>
            ))}
        </div>
      </div>
      <div className={`div__global-navbar ${navClass}`}>
        <p onClick={toggleIsOpen} className="close-navbar">
          x
        </p>
        <div className="navbar__div">
          <NavLink to={"/recipeform"} className="navbar__div-button">
            Ajouter
          </NavLink>
          <NavLink to={"/recipes"} className="navbar__div-button">
            recettes
          </NavLink>
          <NavLink to={"/favorite"} className="navbar__div-button">
            Favoris
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Header;
