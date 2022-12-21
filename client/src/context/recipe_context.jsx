import React, { useReducer, useContext, useEffect } from "react";
import reducer from "../reducers/recipe_reducer";
import axios from "axios";
import UserContext from "./user_context";

import {
  SEARCH_RECIPES_BEGIN,
  SEARCH_RECIPES_SUCCESS,
  SEARCH_RECIPES_ERROR,
  GET_SINGLE_RECIPE_BEGIN,
  GET_SINGLE_RECIPE_SUCCESS,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_RECIPE_BEGIN,
  CREATE_RECIPE_SUCCESS,
  CREATE_RECIPE_ERROR,
  GET_ALL_RECIPES_SUCCESS,
  GET_ALL_RECIPES_BEGIN,
  CHANGE_PAGE,
  CHANGE_LIMIT,
  SET_EDIT_RECIPE,
  UPDATE_RECIPE_BEGIN,
  UPDATE_RECIPE_SUCCESS,
  UPDATE_RECIPE_ERROR,
  DELETE_RECIPE_BEGIN,
  DELETE_RECIPE_ERROR,
} from "../actions";

const searchedRecipes = localStorage.getItem("searchedRecipes");

export const initialState = {
  isEditing: false,
  title: "",
  yields: "",
  time: "",
  ingredients: "",
  instructions: "",
  recipes: [],
  allRecipes: [],
  searchedRecipes: searchedRecipes ? JSON.parse(searchedRecipes) : [],
  singleRecipe: {},
  editRecipeId: "",
  isLoading: true,
  showAlert: false,
  alertType: "",
  alertText: "",
  numOfPages: 1,
  page: 1,
  limit: 12,
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

  // GET ALL RECIPES

  const getAllRecipes = async () => {
    const { page, limit } = state;

    let url = `/recipes?page=${page}&limit=${limit}`;

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

  // CHANGE RECIPE PAGE/LIMIT

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };

  const changeLimit = (limit) => {
    dispatch({ type: CHANGE_LIMIT, payload: { limit } });
  };

  // SEARCH RECIPE

  const searchRecipes = (ingredients) => {
    dispatch({ type: SEARCH_RECIPES_BEGIN });
    // DO WE NEED TRY AND CATCH? ****
    try {
      dispatch({ type: SEARCH_RECIPES_SUCCESS, payload: ingredients });
    } catch {
      dispatch({ type: SEARCH_RECIPES_ERROR });
    }
  };

  const getSingleRecipe = async (id) => {
    dispatch({ type: GET_SINGLE_RECIPE_BEGIN });

    try {
      const response = await authFetch.get(`/recipes/${id}`);
      const { recipe } = response.data;
      dispatch({
        type: GET_SINGLE_RECIPE_SUCCESS,
        payload: { recipe },
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  // CREATE RECIPE FUNCTIONS

  const createRecipe = async () => {
    dispatch({ type: CREATE_RECIPE_BEGIN });
    try {
      let { title, yields, time, ingredients, instructions } = state;
      ingredients = ingredients.split(", ");
      instructions = instructions.split(". ");
      const response = await authFetch.post("/recipes", {
        title,
        yields,
        time,
        ingredients,
        instructions,
      });
      const { allRecipes } = response.data;

      dispatch({ type: CREATE_RECIPE_SUCCESS, payload: { allRecipes } });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_RECIPE_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    });
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const addSearchToLocalStorage = (searchedRecipes) => {
    localStorage.setItem("searchedRecipes", JSON.stringify(searchedRecipes));
  };

  const removeSearchFromLocalStorage = () => {
    localStorage.removeItem("searchedRecipes");
  };

  useEffect(() => {
    addSearchToLocalStorage(state.searchedRecipes);
  }, [state.searchedRecipes]);

  const setEditRecipe = (id) => {
    dispatch({ type: SET_EDIT_RECIPE, payload: { id } });
  };

  // UPDATE RECIPE
  const updateRecipe = async () => {
    dispatch({ type: UPDATE_RECIPE_BEGIN });
    try {
      let { title, yields, time, ingredients, instructions } = state;
      ingredients = ingredients.split(", ");
      instructions = instructions.split(". ");
      await authFetch.patch(`/recipes/${state.editRecipeId}`, {
        title,
        yields,
        time,
        ingredients,
        instructions,
      });

      dispatch({ type: UPDATE_RECIPE_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) return;
      dispatch({
        type: UPDATE_RECIPE_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const deleteRecipe = async (id) => {
    dispatch({ type: DELETE_RECIPE_BEGIN });
    try {
      await authFetch.delete(`/recipes/${id}`);
      getAllRecipes();
      // is there a better wy to reload
      window.location.reload();
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: DELETE_RECIPE_ERROR,
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
        searchRecipes,
        getSingleRecipe,
        handleChange,
        clearValues,
        createRecipe,
        changeLimit,
        removeSearchFromLocalStorage,
        setEditRecipe,
        updateRecipe,
        deleteRecipe,
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
