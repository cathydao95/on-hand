import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { UserContext } from "../../context/user_context";

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
  const { user, favorites, addToFavorites } = useContext(UserContext);

  let currentUser = {
    recipeId: _id,
    userId: user._id,
  };

  let isFavorite = user.favorites.includes(_id);

  return (
    <div className={styles.recipeContainer}>
      <div>
        <img className={styles.recipeImage} src={image} alt={title} />
        <button onClick={(e) => addToFavorites(currentUser)}>
          <AiOutlineHeart className={styles.heartIcon} />
        </button>
      </div>
      <div>
        <Link to={`/recipes/${_id}`}>
          <h5 className={styles.favTitle}>{title}</h5>
        </Link>
      </div>

      <div className={styles.info}>
        <h6 className={styles.calorieInfo}>
          {nutrients && nutrients.calories ? nutrients.calories : "N/A"}
        </h6>
        <h6 className={styles.timeInfo}>{time} min</h6>
      </div>
    </div>
  );
};
export default FavoritedRecipe;
