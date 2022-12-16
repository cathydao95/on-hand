import styles from "./styles.module.scss";
import clsx from "clsx";
import { useContext } from "react";
import RecipeContext from "../../context/recipe_context";
import { UserContext } from "../../context/user_context";
import FormRow from "../../components/FormRow/FormRow";
import Alert from "../../components/Alert/Alert";

//  REFACTOR FORM ROWS INTO A NEW COMPONENT FOR RECIPE AND REGISTER

const CreateRecipe = () => {
  const {
    isEditing,
    title,
    yields,
    time,
    ingredients,
    instructions,
    handleChange,
    clearValues,
    createRecipe,
  } = useContext(RecipeContext);

  const { displayAlert } = useContext(UserContext);

  const handleRecipeInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!title || !yields || !time || !ingredients || !instructions) {
      displayAlert();
      return;
    }

    if (isEditing) {
      return;
    }
    createRecipe();
  };

  return (
    <div className={styles.pageWrapper}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h3 className={clsx(styles.title, "container")}>
          {isEditing ? "Edit Recipe" : "Create Recipe"}
        </h3>
        <Alert />
        <FormRow
          type="text"
          name="title"
          value={title}
          handleChange={handleRecipeInput}
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
            Save My Recipe
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
  );
};

export default CreateRecipe;
