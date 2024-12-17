import "./responsive-Home.css";
import "./Home.css";
import Recipes from "../../components/recipes/Recipes";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-section">
      <div className="home-section__header">
        <h1>les derniers ajout </h1>
        <Link id="Link" to={"/recipes"}>
          voir plus =&gt;
        </Link>
      </div>
      <Recipes renderType={"some"} />
    </div>
  );
}

export default Home;
