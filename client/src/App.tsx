import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import RecipeList from "./pages/recipes/RecipeList/RecipeList";
import RecipeForm from "./pages/recipes/RecipeForm/RecipeForm";
import RecipeDetail from "./pages/recipes/RecipeDetail/RecipeDetail";
import FavoriteRecipes from "./pages/recipes/FavoriteRecipes/FavoriteRecipes";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/recipes"} element={<RecipeList />} />
        <Route path={"/recipes/:id"} element={<RecipeDetail />} />
        <Route path={"/recipeform"} element={<RecipeForm />} />
        <Route path={"/favorite"} element={<FavoriteRecipes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
