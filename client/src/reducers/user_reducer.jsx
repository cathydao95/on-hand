import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  GET_USER_FAVORITES,
  ADD_TO_USER_FAVORITES,
  LOGOUT_USER,
} from "../actions";

import { initialState } from "../context/user_context";

const reducer = (state, action) => {
  // if (action.type === GET_USER_FAVORITES) {
  //   return {
  //     ...state,
  //     favorites: action.payload.formattedRecipes,
  //   };
  if (action.type === GET_USER_FAVORITES) {
    // let tempFavorites = recipes.map((rec) => user.favorites.inludes(rec._id));

    // console.log(tempFavorites);
    return { ...state, favorites: action.payload.formattedRecipes };
  }

  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values",
    };
  }

  if (action.type === CLEAR_ALERT) {
    return { ...state, showAlert: false, alertType: "", alertText: "" };
  }

  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === SETUP_USER_SUCCESS) {
    console.log(action.payload.formattedRecipes);
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      favorites: action.payload.formattedRecipes,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.alertText,
    };
  }

  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "User Information Updated",
    };
  }

  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === ADD_TO_USER_FAVORITES)
    return {
      ...state,
      user: action.payload.currentUser,
      favorites: action.payload.formattedRecipes,
    };

  if (action.type === LOGOUT_USER) {
    return { ...initialState, user: null, token: null };
  }
  throw new Error(`no such action : ${action.type}`);
};

export default reducer;
