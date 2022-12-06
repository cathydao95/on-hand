import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import RecipeContext from "../../context/recipe_context";
import { AiFillHeart } from "react-icons/ai";

const SingleRecipe = ({
  _id,
  title,
  link,
  favorite,
  instructions,
  ingredients,
  image,
  time,
  nutrients,
  yields,
}) => {
  const { addToFavorite } = useContext(RecipeContext);

  return (
    <div className={styles.recipeContainer}>
      <div className={styles.recipeWrapper}>
        <img className={styles.recipeImage} src={image} alt={title} />
        <div className={styles.infoContainer}>
          <div className={styles.headerContainer}>
            <Link to={`/recipes/${_id}`} className={styles.titleContainer}>
              <h1>{title}</h1>
            </Link>
            <button
              className={styles.iconContainer}
              onClick={(e) => addToFavorite(_id)}
            >
              <AiFillHeart
                className={favorite ? styles.fillHeartIcon : styles.heartIcon}
              />
            </button>
          </div>
          <div className={styles.info}>
            <h5 className={styles.calorieInfo}>
              {nutrients.calories ? nutrients.calories : "N/A"}
            </h5>
            <h5 className={styles.timeInfo}>{time} min</h5>
          </div>
        </div>
        {/* </Link> */}
      </div>
    </div>
  );
};
export default SingleRecipe;
