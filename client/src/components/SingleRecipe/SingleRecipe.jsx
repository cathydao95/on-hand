import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import RecipeContext from "../../context/recipe_context";
import { AiFillHeart } from "react-icons/ai";
import UserContext from "../../context/user_context";

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
  const { setEditRecipe, deleteRecipe } = useContext(RecipeContext);

  let currentUser = {
    recipeId: _id,
    userId: user._id,
  };

  let isPersonal = user.personalRecipes.includes(_id);

  let isFavorite = user.favorites && user.favorites.includes(_id);

  return (
    <div className={styles.recipeContainer}>
      <div className={styles.recipeWrapper}>
        <div className={styles.imgContainer}>
          {image !== "" && (
            <img className={styles.recipeImage} src={image} alt={title} />
          )}
          {!isPersonal && (
            <button
              className={styles.iconContainer}
              onClick={(e) => addToFavorites(currentUser)}
            >
              <AiFillHeart
                className={isFavorite ? "fillHeartIcon" : "heartIcon"}
              />
            </button>
          )}
        </div>

        <div>
          <div className={styles.headerContainer}>
            <Link to={`/recipes/${_id}`}>
              <h5 className={styles.recipeTitle}>{title}</h5>
            </Link>
          </div>
          <div className={styles.info}>
            <h6 className={styles.calorieInfo}>
              {nutrients && nutrients.calories ? nutrients.calories : "N/A"}
            </h6>
            <h6 className={styles.timeInfo}>{time} min</h6>
          </div>
        </div>
      </div>

      {isPersonal && (
        <div className={styles.btnContainer}>
          <Link to="/create" className={styles.editBtn}>
            <button className={styles.btn} onClick={(e) => setEditRecipe(_id)}>
              Edit
            </button>
          </Link>
          <button
            className={styles.btn}
            type="button"
            onClick={(e) => deleteRecipe(_id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};
export default SingleRecipe;
