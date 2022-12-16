import Recipes from "../models/Recipes.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../errors/index.js";
import mongoose from "mongoose";
import User from "../models/User.js";
import checkPermissions from "../utils/checkPermissions.js";

const createRecipe = async (req, res) => {
  const { title, yields, time, ingredients, instructions } = req.body;

  if (!title || !yields || !time || !ingredients || !instructions) {
    throw new BadRequestError("Please provide all values");
  }

  req.body.createdBy = req.user.userId;

  let user = await User.findById(req.user.userId);
  // is it ok to change user info in recipes controller???
  const recipe = await Recipes.create(req.body);
  user.personalRecipes.push(recipe._id);
  await user.save();
  const allRecipes = await Recipes.find({});
  res.status(StatusCodes.CREATED).json({ allRecipes });
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

const getSingleRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const recipe = await Recipes.findById(id);
    res.status(StatusCodes.OK).json({ recipe });
  } catch (error) {
    console.log(error);
  }
};

const updateRecipe = async (req, res) => {
  const { id: recipeId } = req.params;

  const { title, yields, time, ingredients, instructions } = req.body;

  if (!title || !yields || !time || !ingredients || !instructions) {
    throw new BadRequestError("Please provide all values");
  }
  const recipe = await Recipes.findOne({ _id: recipeId });

  if (!recipe) {
    throw new NotFoundError(`no recipe with id: ${recipeId}`);
  }
  // add function to throw if no recie found
  checkPermissions(req.user, recipe.createdBy);

  const updatedRecipe = await Recipes.findOneAndUpdate(
    { _id: recipeId },
    req.body,
    { new: true, runValidators: true }
  );

  res.status(StatusCodes.OK).json({ updatedRecipe });
};

const deleteRecipe = async (req, res) => {
  const { id: recipeId } = req.params;

  const recipe = await Recipes.findOne({ _id: recipeId });

  if (!recipe) {
    throw new NotFoundError(`no recipe with id: ${recipeId}`);
  }

  checkPermissions(req.user, recipe.createdBy);

  await recipe.remove();

  let user = await User.findById(req.user.userId);

  user.personalRecipes = user.personalRecipes.filter(
    (id) => id.toString() !== recipeId
  );
  await user.save();

  res.status(StatusCodes.OK).json({ msg: "recipe removed", user });
};

const getSearchedRecipes = async (req, res) => {
  res.send("searched recipes");
};

export {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getSingleRecipe,
  updateRecipe,
  getSearchedRecipes,
};
