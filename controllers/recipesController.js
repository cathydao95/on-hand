import Recipes from "../models/Recipes.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";

const createRecipe = async (req, res) => {
  const { title, yields, time, ingredients, instructions } = req.body;

  if (!title || !yields || !time || !ingredients || !instructions) {
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
  // pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  const recipes = await Recipes.find({}).skip(skip).limit(limit);
  const allRecipes = await Recipes.find({});
  const numOfPages = Math.ceil(allRecipes.length / limit);

  // pagination
  // const page = Number(req.query.page) || 5;
  // const limit = Number(req.query.limit) || 10;
  // const skip = (page - 1) * limit;

  // console.log("skipp", skip, limit, page);
  // result = result.limit(10);

  // console.log("result", result);

  // const recipes = await result;

  // const totalRecipes = await Recipes.countDocuments(recipes);
  // const numOfPages = Math.ceil(totalRecipes / limit);

  res
    .status(StatusCodes.OK)
    .json({ recipes, allRecipes, totalRecipes: recipes.length, numOfPages });
};

const updateRecipe = async (req, res) => {
  res.send("update recipe");
};

export { createRecipe, deleteRecipe, getAllRecipes, updateRecipe };
