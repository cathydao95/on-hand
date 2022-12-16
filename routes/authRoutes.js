import express from "express";
const router = express.Router();

import {
  register,
  login,
  updateUser,
  updateFavorites,
  // createRecipe,
  getPersonalRecipes,
  // getUserFavorites,
} from "../controllers/authController.js";
import authenticate from "../middleware/authenticate.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/updateFavorites").patch(authenticate, updateFavorites);

router.route("/:id/recipes").get(getPersonalRecipes);

router.route("/:id").patch(authenticate, updateUser);
// router.route("/getFavorites").patch(authenticate, getUserFavorites);

export default router;
