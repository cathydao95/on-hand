import User from "../models/User.js";
import Recipe from "../models/Recipes.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import mongoose from "mongoose";
import Recipes from "../models/Recipes.js";

const register = async (req, res) => {
  const { name, lastName, email, password } = req.body;

  let formattedRecipes = [];

  if (!name || !lastName || !email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new BadRequestError("Email already in use");
  }

  const user = await User.create({ name, lastName, email, password });
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      name: user.name,
      _id: user._id,
      favorites: user.favorites,
      personalRecipes: user.personalRecipes,
    },
    token,
    formattedRecipes,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new BadRequestError("Invalid credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();
  user.password = undefined;

  const favorites = await Promise.all(
    user.favorites.map((id) => Recipe.findById(id))
  );

  const formattedRecipes = favorites.map(
    ({
      _id,
      title,
      image,
      link,
      nutrients,
      yields,
      time,
      ingredients,
      instructions,
    }) => {
      return {
        _id,
        title,
        image,
        link,
        nutrients,
        yields,
        time,
        ingredients,
        instructions,
      };
    }
  );
  res.status(StatusCodes.OK).json({ user, token, formattedRecipes });
};

const updateUser = async (req, res) => {
  const { email, name, lastName } = req.body;
  if (!email || !name || !lastName) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;
  user.lastName = lastName;

  await user.save();

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user, token });
};

const updateFavorites = async (req, res) => {
  try {
    const { recipeId, userId } = req.body;
    const recipe = await Recipe.findById(recipeId);
    const user = await User.findById(userId);

    if (user.favorites.includes(recipeId)) {
      user.favorites = user.favorites.filter((id) => id !== recipeId);
    } else {
      user.favorites.push(recipeId);
    }
    await user.save();

    const favorites = await Promise.all(
      user.favorites.map((id) => Recipe.findById(id))
    );

    const formattedRecipes = favorites.map(
      ({
        _id,
        title,
        image,
        link,
        nutrients,
        yields,
        time,
        ingredients,
        instructions,
      }) => {
        return {
          _id,
          title,
          image,
          link,
          nutrients,
          yields,
          time,
          ingredients,
          instructions,
        };
      }
    );

    const token = user.createJWT();

    res.status(StatusCodes.OK).json({ formattedRecipes, user, token });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "didnt work" });
  }
};

// const getUserFavorites = async (req, res) => {
//   try {
//     const { userId } = req.body;
//     const user = await User.findById(userId);

//     const favorites = await Promise.all(
//       user.favorites.map((id) => Recipe.findById(id))
//     );

//     const formattedRecipes = favorites.map(
//       ({
//         _id,
//         title,
//         image,
//         link,
//         nutrients,
//         yields,
//         time,
//         ingredients,
//         instructions,
//       }) => {
//         return {
//           _id,
//           title,
//           image,
//           link,
//           nutrients,
//           yields,
//           time,
//           ingredients,
//           instructions,
//         };
//       }
//     );
//     res.status(StatusCodes.OK).json({ formattedRecipes });
//     // res.status(StatusCodes.OK).json({ user, favorites });
//   } catch (error) {
//     res.status(StatusCodes.BAD_REQUEST).json({ msg: error });
//   }
// };

const getPersonalRecipes = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const createdByUser = await Recipe.find({ createdBy: id });

    res.status(StatusCodes.OK).json({ user, createdByUser });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "didnt work" });
  }
};

export {
  register,
  login,
  updateUser,
  updateFavorites,
  // createRecipe,
  // getUserFavorites,
  getPersonalRecipes,
};
