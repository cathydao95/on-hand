import { useEffect, useState } from "react";
import SingleRecipe from "../SingleRecipe/SingleRecipe";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { AiOutlineSearch } from "react-icons/ai";
import { useContext } from "react";
import RecipeContext from "../../context/recipe_context";
import PageButton from "../../components/PageButton/PageButton";
import { UserContext } from "../../context/user_context";
import { IoLogOut } from "react-icons/io5";

// import { useRecipeContext } from "../../context/recipe_context";

const Dashboard = () => {
  const [userInput, setUserInput] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [expand, setExpand] = useState(false);

  const { user } = useContext(UserContext);
  const { recipes, getAllRecipes, isLoading, page, limit, totalRecipes } =
    useContext(RecipeContext);

  useEffect(() => {
    getAllRecipes();
  }, [page, limit]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (recipes.length === 0) {
    return <div>No Recipes to Display</div>;
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={clsx(styles.title, "title")}>
        <h1>All Recipes</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.formControl}>
          {/* <AiOutlineSearch className={styles.searchIcon} /> */}
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Type your ingredients, separated by commas"
            onChange={(e) => handleChange(e)}
            value={userInput}
          />
          <button className={styles.searchBtn}>
            <AiOutlineSearch className={styles.searchIcon} />
          </button>
        </div>
      </form>

      <div className={styles.test2}>
        <div className={styles.recipesContainer}>
          {recipes.map((ele, index) => {
            return (
              <div className={styles.singleRecipeContainer} key={index}>
                <SingleRecipe key={index} {...ele} />
              </div>
            );
          })}
        </div>
      </div>
      <PageButton />
    </div>
  );
};
export default Dashboard;
