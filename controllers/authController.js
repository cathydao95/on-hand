import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";

const register = async (req, res) => {
  const { name, lastName, email, password } = req.body;

  if (!name || !lastName || !email || !password) {
    throw new BadRequestError("please provide all values");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new BadRequestError("Email already in use");
  }

  const user = await User.create({ name, lastName, email, password });
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    user: { email: user.email, lastName: user.lastName, name: user.name },
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("please provide all values");
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
  res.status(StatusCodes.OK).json({ user, token });
};

const updateUser = (req, res) => {
  res.send("update user");
};

export { register, login, updateUser };
