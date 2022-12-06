import React, { useReducer, useContext, useEffect } from "react";
import reducer from "../reducers/recipe_reducer";
import data from "../Recipes.json";
import { nanoid } from "nanoid";
import {
  FAVORITE_RECIPE,
  SEARCH_RECIPES_BEGIN,
  SEARCH_RECIPES_SUCCESS,
  SEARCH_RECIPES_ERROR,
  GET_FAVORITES_BEGIN,
  GET_FAVORITES_SUCCESS,
  GET_FAVORITES_ERROR,
  GET_SINGLE_RECIPE_BEGIN,
  GET_SINGLE_RECIPE_SUCCESS,
  GET_SINGLE_RECIPE_ERROR,
} from "../actions";

// turn data into an array
let recipeList = Object.values(data.recipes);

// in each recipe, add property of ID. Use index to create ID
// recipeList.map((item, index) => (item._id = nanoid())); cannot use nano(id) becasue provider rerenders and changes nanoid id everytime
// recipeList.map((item, index) => (item._id = index));

recipeList = recipeList.map((item, index) => {
  return { ...item, _id: index, favorite: false };
});

let shortRecipe = recipeList.slice(0, 3);

const getLocalStorage = () => {
  let recipe = localStorage.getItem("recipe");
  if (recipe !== undefined) {
    return JSON.parse(localStorage.getItem("recipe"));
  } else {
    return {};
  }
};

const initialState = {
  recipes: recipeList,
  searchedRecipes: shortRecipe,
  defaultSearch: shortRecipe,
  favoriteList: [],
  loading: false,
  singleRecipeLoading: false,
  singleRecipeError: false,
  singleRecipe: getLocalStorage(),
};

const RecipeContext = React.createContext();

export const RecipeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const searchRecipe = (ingredients) => {
    dispatch({ type: SEARCH_RECIPES_BEGIN });
    // DO WE NEED TRY AND CATCH? ****
    try {
      dispatch({ type: SEARCH_RECIPES_SUCCESS, payload: ingredients });
    } catch {
      dispatch({ type: SEARCH_RECIPES_ERROR });
    }
  };

  const getSingleRecipe = (id) => {
    dispatch({ type: GET_SINGLE_RECIPE_BEGIN });
    try {
      dispatch({ type: GET_SINGLE_RECIPE_SUCCESS, payload: id });
    } catch {
      dispatch({ type: GET_SINGLE_RECIPE_ERROR });
    }
  };

  const addToFavorite = (id) => {
    dispatch({ type: FAVORITE_RECIPE, payload: id });
    // dispatch({ type: GET_FAVORITES_SUCCESS });
  };

  const getFavorites = () => {
    dispatch({ type: GET_FAVORITES_SUCCESS });
  };

  useEffect(() => {
    if (state.singleRecipe !== undefined) {
      localStorage.setItem("recipe", JSON.stringify(state.singleRecipe));
    }
  }, [state.singleRecipe]);

  return (
    <RecipeContext.Provider
      value={{
        ...state,
        addToFavorite,
        searchRecipe,
        getSingleRecipe,
        getFavorites,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeContext;
// export const useRecipeContext = () => {
//   return useContext(RecipeContext);
// };
