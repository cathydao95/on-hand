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
  GET_USER_FAVORITES,
  ADD_TO_USER_FAVORITES,
} from "../actions";

// CHANGE CONTEXT IMPORTS TO MAKE MATCH

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  favorites: [],
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
        logoutUser();
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
  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const removeUserFromLocalStorage = ({ user, token }) => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const response = await axios.post(`/api/auth/${endPoint}`, currentUser);
      console.log(response);
      const { user, token } = response.data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, alertText },
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      console.log(error);
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

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

  const getUserFavorites = async (id) => {
    console.log(id);
    try {
      const { data } = await authFetch.get("/auth/favorites", id);
      const { formattedRecipes } = data;
      dispatch({ type: GET_USER_FAVORITES, payload: { formattedRecipes } });
    } catch (error) {
      console.log(error);
    }
  };

  const addToFavorites = async (current) => {
    console.log(current);
    try {
      const { data } = await authFetch.patch("/auth/updateFavorites", current);
      const { formattedRecipes, currentUser } = data;
      dispatch({
        type: ADD_TO_USER_FAVORITES,
        payload: { formattedRecipes, currentUser },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const logoutUser = () => {};

  return (
    <UserContext.Provider
      value={{
        ...state,
        displayAlert,
        clearAlert,
        setupUser,
        updateUser,
        getUserFavorites,
        addToFavorites,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
