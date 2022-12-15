import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { AiOutlineSearch } from "react-icons/ai";
import { useContext } from "react";
import RecipeContext from "../../context/recipe_context";
import IngredientList from "../../components/IngredientList/IngredientList";
import Loading from "../../components/Loading/Loading";
import SearchedRecipes from "../../components/SearchedRecipes/SearchedRecipes";

const Search = () => {
  const [ingredients, setIngredients] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  const {
    clearValues,
    searchRecipes,
    searchedRecipes,
    getAllRecipes,
    isLoading,
  } = useContext(RecipeContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ingredients) {
      searchRecipes(ingredients);
      setShowSearch(true);
    }
    // if (ingredients) {
    //   searchRecipes(ingredients);
    // }
    // setShowSearch(true);
  };

  const clearInput = () => {
    setShowSearch(false);

    setIngredients([]);
    clearValues();
  };

  const clearSearchResults = () => {
    setShowSearch(false);
    clearValues();
  };

  // const handleChange = (e) => {
  //   setUserInput(e.target.value);
  // };

  useEffect(() => {
    // clearValues();
    getAllRecipes();
    if (searchedRecipes.length > 0) {
      setShowSearch(true);
    }
  }, []);

  console.log(showSearch);

  // useEffect(() => {
  //   setIngredients(userInput);
  // }, [userInput]);

  console.log(ingredients);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={clsx(styles.pageWrapper, "pageWrapper")}>
      <div className={clsx(styles.title, "title")}>
        <h3>Let's get cooking!</h3>
        <p> What ingredients do you have on hand?</p>
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.formControl}>
          {/* remove for now until can implment but text and search function */}

          {/* <input
              className={styles.searchInput}
              type="text"
              placeholder="Type your ingredients, separated by commas"
              onChange={(e) => handleChange(e)}
              value={userInput}
            /> */}
          {!showSearch && searchedRecipes.length < 1 && (
            <button
              disabled={ingredients.length < 1}
              className={styles.searchBtn}
              type="submit"
            >
              <span>Search for Recipes</span>
              <AiOutlineSearch className={styles.searchIcon} />
            </button>
          )}

          {!showSearch ? (
            <div>
              <IngredientList
                setIngredients={setIngredients}
                ingredients={ingredients}
              />
            </div>
          ) : (
            <div className={styles.searchResults}>
              <SearchedRecipes />
            </div>
          )}
        </div>
      </form>
      {searchedRecipes.length > 0 ? (
        <button
          onClick={() => clearSearchResults()}
          className={clsx(styles.clearBtn, "btn")}
        >
          Clear Search
        </button>
      ) : (
        <button
          onClick={() => clearInput()}
          className={clsx(styles.clearBtn, "btn")}
        >
          {!showSearch ? "Clear All Values" : "Restart Search"}
        </button>
      )}
    </div>
  );
};
export default Search;
