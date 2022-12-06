import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RecipeProvider } from "./context/recipe_context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecipeProvider>
    <App />
  </RecipeProvider>
);
