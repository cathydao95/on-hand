import styles from "./styles.module.scss";
import clsx from "clsx";
import { useContext } from "react";
import RecipeContext from "../../context/recipe_context";
import UserContext from "../../context/user_context";
import FormRow from "../../components/FormRow/FormRow";

import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

//  REFACTOR FORM ROWS INTO A NEW COMPONENT FOR RECIPE AND REGISTER

const CreateRecipe = () => {
  // const navigate = useNavigate();
  const {
    isEditing,
    title,
    image,
    yields,
    time,
    ingredients,
    instructions,
    handleChange,
    clearValues,
    createRecipe,
    updateRecipe,
    recipeImageInput,
  } = useContext(RecipeContext);

  const { displayAlert } = useContext(UserContext);

  const handleRecipeInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
    if (name === "image") {
      recipeImageInput(value);
    }
  };

  const handleRecipeImage = (e) => {
    const value = e.target.files[0];
    recipeImageInput(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!title || !yields || !time || !ingredients || !instructions) {
      displayAlert();

      return;
    }

    if (isEditing) {
      updateRecipe();

      // navigate("/myrecipes");

      return;
    }

    createRecipe();

    // navigate("/myrecipes");
  };

  return (
    <div>
      <Navbar />
      <div className="pageWrapper">
        <form className={styles.form} onSubmit={onSubmit}>
          <h3 className={clsx(styles.title, "title")}>
            {isEditing ? "Edit Recipe" : "Create Recipe"}
          </h3>

          <FormRow
            type="text"
            name="title"
            value={title}
            handleChange={handleRecipeInput}
          />
          <FormRow
            type="file"
            name="image"
            accept="image/*"
            handleChange={handleRecipeImage}
          />
          <FormRow
            type="text"
            name="yields"
            value={yields}
            handleChange={handleRecipeInput}
          />
          <FormRow
            type="text"
            name="time"
            value={time}
            handleChange={handleRecipeInput}
          />
          <FormRow
            type="text"
            name="ingredients"
            value={ingredients}
            handleChange={handleRecipeInput}
          />
          <FormRow
            type="text"
            name="instructions"
            value={instructions}
            handleChange={handleRecipeInput}
          />
          <div className={styles.btnContainer}>
            <button
              type="submit"
              onClick={onSubmit}
              className={clsx(styles.btn, "btn")}
            >
              {isEditing ? "Update Recipe" : "Save Recipe"}
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
              className={clsx(styles.btn, "btn")}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreateRecipe;
