import express from "express";
const router = express.Router();

import {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  updateRecipe,
} from "../controllers/recipesController.js";

router.route("/").post(createRecipe).get(getAllRecipes);

router.route("/:id").delete(deleteRecipe).patch(updateRecipe);

export default router;
