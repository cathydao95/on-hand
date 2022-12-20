import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { AiOutlineSearch } from "react-icons/ai";
import { useContext } from "react";
import RecipeContext from "../../context/recipe_context";
import IngredientList from "../../components/IngredientList/IngredientList";
import Loading from "../../components/Loading/Loading";
import SearchedRecipes from "../../components/SearchedRecipes/SearchedRecipes";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

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

  // useEffect(() => {
  //   setIngredients(userInput);
  // }, [userInput]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Navbar />
      <div className="pageWrapper">
        {showSearch ? (
          <div className="title">
            <h3>Recipes Found:</h3>
          </div>
        ) : (
          <div className={styles.textContainer}>
            <h3 className="title">Let's get cooking!</h3>
            <p> What ingredients do you have on hand?</p>
          </div>
        )}
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
                className={clsx(styles.searchBtn, "btn")}
                type="submit"
              >
                Search for Recipes
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
        <div>
          {searchedRecipes.length > 0 ? (
            <button
              onClick={() => clearSearchResults()}
              className={clsx(styles.clearBtn, "btn")}
            >
              Clear Search
            </button>
          ) : (
            <div className={styles.btnContainer}>
              <button
                onClick={() => clearInput()}
                className={clsx(styles.clearBtn, "btn")}
              >
                {!showSearch ? "Clear All Values" : "Restart Search"}
              </button>
              <button
                disabled={ingredients.length < 1}
                className={clsx(styles.searchBtn, "btn")}
                type="submit"
                onClick={(e) => handleSubmit(e)}
              >
                Search for Recipes
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Search;
