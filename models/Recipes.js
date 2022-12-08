import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const RecipesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minLength: 3,
    maxLength: 40,
  },
  image: {
    type: String,
    default:
      "https://www.allrecipes.com/thmb/j3loP2uIKWVrpap0rTXd2Wj4po4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/4518035-7dfbe359b0e1404eac6a329c45def148.jpg",
  },
  link: {
    type: String,
    default:
      "https://www.allrecipes.com/recipe/263394/garlic-shrimp-pasta-bake/",
  },
  nutrients: {
    type: String,
    default: "Not Available",
  },
  yields: {
    type: String,
    required: [true, "Please provide serving size"],
  },
  time: {
    type: String,
    required: [true, "Please provide cooking time"],
  },
  ingredients: {
    type: Array,
    required: [true, "Please provide ingredients"],
    trim: true,
  },
  instructions: {
    type: Array,
    required: [true, "Please provide instructions"],
    trim: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide name"],
  },
});

export default mongoose.model("Recipes", RecipesSchema);
