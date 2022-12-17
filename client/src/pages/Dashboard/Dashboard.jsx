import { useEffect, useState } from "react";
import SingleRecipe from "../../components/SingleRecipe/SingleRecipe";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { AiOutlineSearch } from "react-icons/ai";
import { useContext } from "react";
import RecipeContext from "../../context/recipe_context";
import PageButton from "../../components/PageButton/PageButton";
import Loading from "../../components/Loading/Loading";
import Navbar from "../../components/Navbar/Navbar";

// import { useRecipeContext } from "../../context/recipe_context";

const Dashboard = () => {
  const [userInput, setUserInput] = useState("");

  const { recipes, getAllRecipes, isLoading, page, limit } =
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
    return <Loading />;
  }

  // Figure out why getting no recipes sometimes after refresh

  // if (recipes.length === 0) {
  //   return <div>No Recipes to Display</div>;
  // }

  // implement scroll to top

  return (
    <div>
      <Navbar />
      <div className="pageWrapper">
        <div className={clsx(styles.title, "title")}>
          <h1>All Recipes</h1>
        </div>
        {/* determine how to implement search function here */}
        <form onSubmit={handleSubmit}>
          <div className={styles.formControl}>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search recipes"
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
    </div>
  );
};
export default Dashboard;
