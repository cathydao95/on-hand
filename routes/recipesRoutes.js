import express from "express";
const router = express.Router();

import {
  getSingleRecipe,
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  updateRecipe,
} from "../controllers/recipesController.js";

router.route("/").post(createRecipe).get(getAllRecipes);

router
  .route("/:id")
  .delete(deleteRecipe)
  .patch(updateRecipe)
  .get(getSingleRecipe);

export default router;
