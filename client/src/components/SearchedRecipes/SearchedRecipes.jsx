import styles from "./styles.module.scss";
import SingleRecipe from "../SingleRecipe/SingleRecipe";
import { useContext } from "react";
import RecipeContext from "../../context/recipe_context";
import { TfiFaceSad } from "react-icons/tfi";

const SearchedRecipes = () => {
  const { searchedRecipes } = useContext(RecipeContext);
  return (
    <div>
      {searchedRecipes.length > 0 ? (
        <div className="container">
          {searchedRecipes.map((ele, index) => {
            return (
              <div className={styles.singleRecipeContainer} key={index}>
                <SingleRecipe key={index} {...ele} />
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.noRecipes}>
          <TfiFaceSad className={styles.sadIcon} />
          <p>No recipes found. Please try again.</p>
        </div>
      )}
    </div>
  );
};

export default SearchedRecipes;
