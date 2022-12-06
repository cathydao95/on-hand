import { initScriptLoader } from "next/script";
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

const recipe_reducer = (state, action) => {
  if (action.type === SEARCH_RECIPES_BEGIN) {
    return { ...state };
  }
  if (action.type === SEARCH_RECIPES_SUCCESS) {
    const { recipes, searchedRecipes } = state;
    let tempSearch = [];

    let defaultIng = ["water", "oil", "salt", "pepper"];

    let userIngredients = [...action.payload, ...defaultIng];

    console.log(userIngredients);

    recipes.map((rec) => {
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
    return { ...state, searchedRecipes: tempSearch };

    // map through each item in action payload and then map through each recipe... if ingredients contain the action.payload, push into tempSearch array
    // action.payload.map((item) => {
    //   return recipes.map((rec) =>
    //     rec.ingredients.join(",").indexOf(item) >= 1
    //       ? tempSearch.push({ ...rec })
    //       : { ...rec }
    //   );
    // });

    // NOTE: this one is wrong becasue it push in duplicates into array since mapping through each ingredient and some ingredients call for multiple kinds of sugar
    // recipes.map((rec) => {
    //   return rec.ingredients.filter((ing) => {
    //     return ing.includes(action.payload)
    //       ? tempSearch.push({ ...rec })
    //       : { ...rec };
    //   });
    // });
  }

  if (action.type === GET_SINGLE_RECIPE_BEGIN) {
    const { recipes, singleRecipe } = state;

    // *****is it ok to set search back to inital here?? **

    let resetSearched = recipes.slice(0, 3);
    return {
      ...state,
      searchedRecipes: resetSearched,
    };
  }

  if (action.type === GET_SINGLE_RECIPE_SUCCESS) {
    const { recipes, singleRecipe } = state;

    let tempRecipe = recipes.find((rec) => rec._id == action.payload);

    return { ...state, singleRecipe: tempRecipe };
  }

  if (action.type === GET_SINGLE_RECIPE_ERROR) {
    return { ...state };
  }

  // favorite/unfavorite recipe
  if (action.type === FAVORITE_RECIPE) {
    const { recipes, searchedRecipes, singleRecipe } = state;

    let temp = recipes.map((rec) => {
      return rec._id === action.payload
        ? { ...rec, favorite: !rec.favorite }
        : { ...rec };
    });

    let temp2 = searchedRecipes.map((rec) => {
      return rec._id === action.payload
        ? { ...rec, favorite: !rec.favorite }
        : { ...rec };
    });

    return {
      ...state,
      recipes: temp,
      searchedRecipes: temp2,
      singleRecipe: { ...singleRecipe, favorite: !singleRecipe.favorite },
    };
  }

  // get favorites recipe list
  if (action.type === GET_FAVORITES_SUCCESS) {
    const { recipes, favoriteList } = state;

    let tempfavorites = recipes.filter((rec) => {
      return rec.favorite === true;
    });

    // *****is it ok to set search back to inital here?? **

    let resetSearched = recipes.slice(0, 3);

    return {
      ...state,
      favoriteList: tempfavorites,
      searchedRecipes: resetSearched,
    };
  }
};

export default recipe_reducer;
