import React from "react";
import ReactDOM from "react-dom/client";
import styles from "./styles/index.scss";
import App from "./App";
import { UserProvider } from "./context/user_context";
import { RecipeProvider } from "./context/recipe_context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <RecipeProvider>
      <App />
    </RecipeProvider>
  </UserProvider>
);
