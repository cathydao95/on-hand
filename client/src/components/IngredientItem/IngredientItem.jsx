import { useState } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";

const IngredientItem = ({ examples, ingredients, addToIngredients }) => {
  // let sorted = examples.sort((a, b) => a.localeCompare(b));

  return (
    <div className={styles.ingBtnContainer}>
      {examples
        .sort((a, b) => a.localeCompare(b))
        .map((ex, index) => {
          return (
            // <button
            //   type="button"
            //   className={ingredients.includes(ex) ? styles.activeBtn : styles.btn}
            //   key={index}
            //   name={ex}
            //   value={ex}
            //   onClick={(e) => addToIngredients(e.target.value)}
            // >
            //   {ex}
            // </button>

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
