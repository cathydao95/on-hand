import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
// import RecipeContext from "../../context/recipe_context";
import { AiFillHeart } from "react-icons/ai";
import { UserContext } from "../../context/user_context";

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
  const { addToFavorites, user } = useContext(UserContext);

  let currentUser = {
    recipeId: _id,
    userId: user._id,
  };

  let isFavorite = user.favorites && user.favorites.includes(_id);

  return (
    <div className={styles.recipeContainer}>
      <div className={styles.recipeWrapper}>
        <div className={styles.imgContainer}>
          <img className={styles.recipeImage} src={image} alt={title} />
          <button
            className={styles.iconContainer}
            onClick={(e) => addToFavorites(currentUser)}
          >
            <AiFillHeart
              className={isFavorite ? styles.fillHeartIcon : styles.heartIcon}
            />
          </button>
        </div>

        <div>
          <div className={styles.headerContainer}>
            <Link to={`/recipes/${_id}`}>
              <h5 className={styles.recipeTitle}>{title}</h5>
            </Link>
            {/* <button
              className={styles.iconContainer}
              onClick={(e) => addToFavorite(_id)}
            >
              <AiFillHeart
                className={favorite ? styles.fillHeartIcon : styles.heartIcon}
              />
            </button> */}
          </div>
          <div className={styles.info}>
            <h6 className={styles.calorieInfo}>
              {nutrients && nutrients.calories ? nutrients.calories : "N/A"}
            </h6>
            <h6 className={styles.timeInfo}>{time} min</h6>
          </div>
        </div>
        {/* </Link> */}
      </div>
    </div>
  );
};
export default SingleRecipe;
