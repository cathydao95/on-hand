import {
  SEARCH_RECIPES_BEGIN,
  SEARCH_RECIPES_SUCCESS,
  SEARCH_RECIPES_ERROR,
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
  RESET_PAGE,
  CHANGE_LIMIT,
} from "../actions";
import { initialState } from "../context/recipe_context";

const recipe_reducer = (state, action) => {
  if (action.type === GET_ALL_RECIPES_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }

  if (action.type === GET_ALL_RECIPES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      recipes: action.payload.recipes,
      allRecipes: action.payload.allRecipes,
      // searchedRecipes: action.payload.allRecipes,
      // defaultSearch: action.payload.recipes,
      totalRecipes: action.payload.totalRecipes,
      numOfPages: action.payload.numOfPages,
    };
  }

  if (action.type === CHANGE_PAGE) {
    return { ...state, page: action.payload.page };
  }

  if (action.type === CHANGE_LIMIT) {
    console.log(action.payload.limit);
    return { ...state, limit: action.payload.limit };
  }
  if (action.type === SEARCH_RECIPES_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === SEARCH_RECIPES_SUCCESS) {
    const { allRecipes } = state;
    let tempSearch = [];

    let defaultIng = ["water", "oil", "salt", "pepper"];

    let userIngredients = [...action.payload, ...defaultIng];

    console.log(userIngredients);

    allRecipes.map((rec) => {
      let counter = 0;
      // map through each ingredient in recipe ingredients.. if one of the strings contain elements in action.payload... add to counter
      rec.ingredients.map((str) => {
        if (userIngredients.some((word) => str.includes(word))) {
          counter++;
        } else {
        }
      });

      if (counter === rec.ingredients.length) {
        tempSearch.push({ ...rec });
        counter = 0;
      }
    });

    // this adds recips that include the ingredients, but does not account for ingredients that are not listed...
    // recipes.map((rec) =>
    //   action.payload.every((item) => rec.ingredients.join(",").includes(item))
    //     ? tempSearch.push({ ...rec })
    //     : { ...rec }
    // );

    console.log(tempSearch);
    return { ...state, searchedRecipes: tempSearch, isLoading: false };

    // map through each item in action payload and then map through each recipe... if ingredients contain the action.payload, push into tempSearch array
    // action.payload.map((item) => {
    //   return recipes.map((rec) =>
    //     rec.ingredients.join(",").indexOf(item) >= 1
    //       ? tempSearch.push({ ...rec })
    //       : { ...rec }
    //   );
    // });
  }

  if (action.type === GET_SINGLE_RECIPE_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === GET_SINGLE_RECIPE_SUCCESS) {
    return { ...state, isLoading: false, singleRecipe: action.payload.recipe };
  }

  // if (action.type === GET_SINGLE_RECIPE_SUCCESS) {
  //   const { allRecipes } = state;
  //   console.log("pay", action.payload);

  //   console.log(allRecipes);

  //   allRecipes.map((rec) => console.log("typeof", typeof rec._id));

  //   let tempRecipe = allRecipes.find((rec) =>
  //     console.log("lol", rec._id === action.payload, rec._id, action.payload)
  //   );

  //   return { ...state, isLoading: false, singleRecipe: tempRecipe };
  // }

  if (action.type === GET_SINGLE_RECIPE_ERROR) {
    return { ...state };
  }

  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
    };
  }

  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      title: "",
      yields: "",
      time: "",
      ingredients: "",
      instructions: "",
      searchedRecipes: [],
    };
    return {
      ...state,
      ...initialState,
    };
  }

  if (action.type === CREATE_RECIPE_BEGIN) {
    console.log("1", state);
    let test1 = state.ingredients.split(", ");
    console.log(test1);
    return {
      ...state,
      isLoading: true,
      ingredients: test1,
    };
  }

  if (action.type === CREATE_RECIPE_SUCCESS) {
    console.log("2", state);
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New Recipe Created!",
    };
  }
  if (action.type === CREATE_RECIPE_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === RESET_PAGE) {
    return { ...initialState };
  }
};

export default recipe_reducer;
