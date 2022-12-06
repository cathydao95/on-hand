import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import RecipeContext from "../../context/recipe_context";
import { AiOutlineHeart } from "react-icons/ai";

const FavoritedRecipe = ({
  _id,
  title,
  link,
  instructions,
  ingredients,
  image,
  time,
  nutrients,
  yields,
}) => {
  const { addToFavorite, favoriteList } = useContext(RecipeContext);

  return (
    <div className={styles.recipeContainer}>
      <div className={styles.imageWrapper}>
        <img className={styles.recipeImage} src={image} alt={title} />
        {/* <button onClick={(e) => addToFavorite(_id)}>
          <AiOutlineHeart className={styles.heartIcon} />
        </button> */}
      </div>
      <div>
        <Link to={`/recipes/${_id}`}>
          <h1>{title}</h1>
        </Link>
      </div>

      <div className={styles.info}>
        <h5 className={styles.calorieInfo}>
          {nutrients.calories ? nutrients.calories : "N/A"}
        </h5>
        <h5 className={styles.timeInfo}>{time} min</h5>
      </div>
    </div>
  );
};
export default FavoritedRecipe;
