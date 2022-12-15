import express from "express";
const router = express.Router();

import {
  getSingleRecipe,
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  updateRecipe,
  getSearchedRecipes,
} from "../controllers/recipesController.js";

router.route("/").post(createRecipe).get(getAllRecipes);

router
  .route("/:id")
  .delete(deleteRecipe)
  .patch(updateRecipe)
  .get(getSingleRecipe);

router.route("/test").get(getSearchedRecipes);
export default router;
