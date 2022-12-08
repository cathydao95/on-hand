import Recipes from "../models/Recipes.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";

const createRecipe = async (req, res) => {
  const { name, yields, time, ingredients, instructions } = req.body;

  if (!name || !yields || !time || !ingredients || !instructions) {
    throw new BadRequestError("Please provide all values");
  }

  req.body.createdBy = req.user.userId;

  const recipe = await Recipes.create(req.body);
  res.status(StatusCodes.CREATED).json({ recipe });
};

const deleteRecipe = async (req, res) => {
  res.send("delete recipe");
};

const getAllRecipes = async (req, res) => {
  res.send("get all recipes");
};

const updateRecipe = async (req, res) => {
  res.send("update recipe");
};

export { createRecipe, deleteRecipe, getAllRecipes, updateRecipe };
