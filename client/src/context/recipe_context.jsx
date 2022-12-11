import React, { useReducer, useContext, useEffect } from "react";
import reducer from "../reducers/recipe_reducer";
import axios from "axios";
import { UserContext } from "./user_context";

import {
  // FAVORITE_RECIPE,
  SEARCH_RECIPES_BEGIN,
  SEARCH_RECIPES_SUCCESS,
  SEARCH_RECIPES_ERROR,
  // GET_FAVORITES_SUCCESS,
  GET_SINGLE_RECIPE_BEGIN,
  GET_SINGLE_RECIPE_SUCCESS,
  GET_SINGLE_RECIPE_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_RECIPE_BEGIN,
  CREATE_RECIPE_SUCCESS,
  CREATE_RECIPE_ERROR,
  GET_ALL_RECIPES_SUCCESS,
  GET_ALL_RECIPES_BEGIN,
  CHANGE_PAGE,
} from "../actions";

// // turn data into an array
// let recipeList = Object.values(data.recipes);

// // in each recipe, add property of ID. Use index to create ID
// // recipeList.map((item, index) => (item._id = nanoid())); cannot use nano(id) becasue provider rerenders and changes nanoid id everytime
// // recipeList.map((item, index) => (item._id = index));

// recipeList = recipeList.map((item, index) => {
//   return { ...item, _id: index, favorite: false };
// });

// let shortRecipe = recipeList.slice(0, 3);

// // const getLocalStorage = () => {
// //   let recipe = localStorage.getItem("recipe");
// //   if (recipe !== undefined) {
// //     return JSON.parse(localStorage.getItem("recipe"));
// //   } else {
// //     return {};
// //   }
// // };

const initialState = {
  isEditing: false,
  title: "",
  yields: "",
  time: "",
  ingredients: "",
  instructions: "",
  recipes: [],
  allRecipes: [],
  searchedRecipes: [],
  defaultSearch: [],
  favoriteList: [],
  singleRecipeLoading: false,
  singleRecipeError: false,
  singleRecipe: {},
  // singleRecipe: getLocalStorage(),
  isLoading: false,
  showAlert: false,
  alertType: "",
  alertText: "",
  totalRecipes: 0,
  numOfPages: 1,
  page: 1,
};

const RecipeContext = React.createContext();

export const RecipeProvider = ({ children }) => {
  const { token } = useContext(UserContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  // axios instance
  const authFetch = axios.create({
    baseURL: "/api",
  });

  // axios interceptors
  authFetch.interceptors.request.use(
    (config) => {
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getAllRecipes = async () => {
    const { page } = state;

    let url = `/recipes?page=${page}`;

    dispatch({ type: GET_ALL_RECIPES_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { recipes, allRecipes, totalRecipes, numOfPages } = data;
      dispatch({
        type: GET_ALL_RECIPES_SUCCESS,
        payload: { recipes, allRecipes, totalRecipes, numOfPages },
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };

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

  // const addToFavorite = (id) => {
  //   dispatch({ type: FAVORITE_RECIPE, payload: id });
  //   // dispatch({ type: GET_FAVORITES_SUCCESS });
  // };

  // const getFavorites = () => {
  //   dispatch({ type: GET_FAVORITES_SUCCESS });
  // };

  // useEffect(() => {
  //   if (state.singleRecipe !== undefined) {
  //     localStorage.setItem("recipe", JSON.stringify(state.singleRecipe));
  //   }
  // }, [state.singleRecipe]);

  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    });
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const createRecipe = async () => {
    dispatch({ type: CREATE_RECIPE_BEGIN });
    try {
      const { title, yields, time, ingredients, instructions } = state;
      await authFetch.post("/recipes", {
        title,
        yields,
        time,
        ingredients,
        instructions,
      });
      dispatch({ type: CREATE_RECIPE_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_RECIPE_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  return (
    <RecipeContext.Provider
      value={{
        ...state,
        getAllRecipes,
        changePage,
        // addToFavorite,
        searchRecipe,
        getSingleRecipe,
        // getFavorites,
        handleChange,
        clearValues,
        createRecipe,
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
