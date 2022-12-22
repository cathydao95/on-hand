import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { useContext } from "react";
import RecipeContext from "../../context/recipe_context";
import IngredientList from "../../components/IngredientList/IngredientList";
import Loading from "../../components/Loading/Loading";
import SearchedRecipes from "../../components/SearchedRecipes/SearchedRecipes";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

const RecipesFound = () => {
  const navigate = useNavigate();

  const { isLoading } = useContext(RecipeContext);

  const clearSearchResults = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Navbar />
      <div className="pageWrapper">
        <div className="title">
          <h3>Recipes Found:</h3>
        </div>

        <div className={styles.searchResults}>
          <SearchedRecipes />
        </div>

        <div>
          <button
            onClick={() => clearSearchResults()}
            className={clsx(styles.clearBtn, "btn")}
          >
            Restart Search
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default RecipesFound;
