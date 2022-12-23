import { StatusCodes } from "http-status-codes";
import path from "path";

const uploadRecipeImage = async (req, res) => {
  let recipeImage = req.files.image;
  console.log(recipeImage);

  const dirname = import.meta.url.slice(7);

  const imagePath = path.join(
    dirname,
    `../../client/public/uploads/${recipeImage.name}`
  );

  await recipeImage.mv(imagePath);
  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${recipeImage.name}` } });
};

export { uploadRecipeImage };
