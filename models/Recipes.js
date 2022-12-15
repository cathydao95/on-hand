import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const RecipesSchema = new mongoose.Schema({
  title: {
    type: String,
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
    type: Object,
    default: "Not Available",
  },
  yields: {
    type: String,
  },
  time: {
    type: String,
  },
  ingredients: {
    type: Array,
  },
  instructions: {
    type: Array,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Recipes", RecipesSchema);
