import styles from "./styles.module.scss";

const IngredientItem = ({ examples, ingredients, addToIngredients }) => {
  return (
    <div className={styles.ingBtnContainer}>
      {examples
        .sort((a, b) => a.localeCompare(b))
        .map((ex, index) => {
          return (
            <div key={ex}>
              <input
                key={ex}
                type="checkbox"
                id="topping"
                name={ex}
                value={ex}
                checked={ingredients.includes(ex)}
                onChange={(e) => addToIngredients(e.target.value)}
              />
              <label className={styles.ingredientText} htmlFor={ex}>
                {ex}
              </label>
            </div>
          );
        })}
    </div>
  );
};

export default IngredientItem;
