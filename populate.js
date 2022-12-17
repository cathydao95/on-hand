import { readFile } from "fs/promises";

import dotenv from "dotenv";
dotenv.config();

import connectDB from "./db/connect.js";
import Recipes from "./models/Recipes.js";

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    await Recipes.deleteMany();

    const jsonProducts = JSON.parse(
      await readFile(new URL("./Recipes.json", import.meta.url))
    );
    await Recipes.create(jsonProducts);
    console.log("Success!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
