import React, { useReducer } from "react";
import reducer from "../reducers/user_reducer";
import axios from "axios";

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  // GET_USER_FAVORITES,
  ADD_TO_USER_FAVORITES,
  LOGOUT_USER,
  GET_PERSONAL_BEGIN,
  GET_PERSONAL_SUCCESS,
} from "../actions";

// CHANGE CONTEXT IMPORTS TO MAKE MATCH

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const favorites = localStorage.getItem("favorites");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  favorites: favorites ? JSON.parse(favorites) : [],
  personalRecipes: [],
};

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // axios instance
  const authFetch = axios.create({
    baseURL: "/api",
  });

  // axios interceptors
  authFetch.interceptors.request.use(
    (config) => {
      config.headers["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.response);
      if (error.response.status === 401) {
        logOutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };
  const addUserToLocalStorage = ({ user, token, formattedRecipes }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("favorites", JSON.stringify(formattedRecipes));
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("favorites");
  };
  const logOutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const response = await axios.post(`/api/auth/${endPoint}`, currentUser);
      console.log(response);
      const { user, token, formattedRecipes } = response.data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, alertText, formattedRecipes },
      });
      addUserToLocalStorage({ user, token, formattedRecipes });
    } catch (error) {
      console.log(error);
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  // may need to add favortes/formatted recipes in as token
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);

      const { user, token } = data;
      dispatch({ type: UPDATE_USER_SUCCESS, payload: { user, token } });

      addUserToLocalStorage({ user, token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  // const getUserFavorites = async (userId) => {
  //   try {
  //     const { data } = await authFetch.patch("/auth/getFavorites", userId);
  //     const { formattedRecipes } = data;
  //     dispatch({ type: GET_USER_FAVORITES, payload: { formattedRecipes } });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const addToFavorites = async (current) => {
    console.log(current);
    try {
      const { data } = await authFetch.patch("/auth/updateFavorites", current);
      const { formattedRecipes, user, token } = data;
      dispatch({
        type: ADD_TO_USER_FAVORITES,
        payload: { formattedRecipes, user, token },
      });
      addUserToLocalStorage({ formattedRecipes, user, token });
    } catch (error) {
      console.log(error);
    }
  };

  const getPersonalRecipes = async (id) => {
    dispatch({ type: GET_PERSONAL_BEGIN });
    try {
      const { data } = await authFetch.get(`/auth/${id}/recipes`);
      const { user, createdByUser } = data;
      dispatch({
        type: GET_PERSONAL_SUCCESS,
        payload: { user, createdByUser },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <UserContext.Provider
      value={{
        ...state,
        displayAlert,
        clearAlert,
        setupUser,
        updateUser,
        // getUserFavorites,
        addToFavorites,
        logOutUser,
        getPersonalRecipes,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, initialState, UserContext };
