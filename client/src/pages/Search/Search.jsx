import { useEffect, useState } from "react";
// import { RecipeContext } from "../../context/recipe_context";
import SingleRecipe from "../SingleRecipe/SingleRecipe";
import data from "../../Recipes.json";
import styles from "./styles.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { useContext } from "react";
import RecipeContext from "../../context/recipe_context";
import { TfiFaceSad } from "react-icons/tfi";
// import { useRecipeContext } from "../../context/recipe_context";

const Search = () => {
  const [userInput, setUserInput] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [expand, setExpand] = useState(false);

  const { searchRecipe, searchedRecipes } = useContext(RecipeContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (ingredients) {
      searchRecipe(ingredients);
    }
  };

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const expandList = () => {
    setExpand((prevExpand) => !prevExpand);
  };

  useEffect(() => {
    setIngredients(() => userInput.split(","));
  }, [userInput]);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.textContainer}>
        <h1 className={styles.titleText}>Search</h1>
        <h3>What is in your kitchen?</h3>
        <p>Enter some ingredients</p>
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
      </div>
      <div className={styles.recipesContainer}>
        <div>
          <div>
            {searchedRecipes.length > 0 ? (
              <div>
                {expand
                  ? searchedRecipes.map((ele, index) => {
                      return (
                        <div
                          className={styles.singleRecipeContainer}
                          key={index}
                        >
                          <SingleRecipe key={index} {...ele} />
                        </div>
                      );
                    })
                  : searchedRecipes.slice(0, 3).map((ele, index) => {
                      return (
                        <div
                          className={styles.singleRecipeContainer}
                          key={index}
                        >
                          <SingleRecipe key={index} {...ele} />
                        </div>
                      );
                    })}
              </div>
            ) : (
              <div className={styles.noRecipes}>
                <TfiFaceSad className={styles.sadIcon} />
                <p>No Recipes Found. Please try again</p>
              </div>
            )}
          </div>
        </div>
        <div className={styles.btnContainer}>
          {searchedRecipes.length > 3 && (
            <button className={styles.allBtn} onClick={expandList}>
              {expand ? "Collapse" : "See All"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Search;
