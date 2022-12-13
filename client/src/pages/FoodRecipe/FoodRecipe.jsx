import styles from "./styles.module.scss";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import RecipeContext from "../../context/recipe_context";
import { AiFillCloseSquare } from "react-icons/ai";
import { BsSuitHeartFill } from "react-icons/bs";
import { UserContext } from "../../context/user_context";
import Loading from "../../components/Loading/Loading";
// import { useRecipeContext } from "../../context/recipe_context";
// individual receipe page for an item, may need to rename

const FoodRecipe = () => {
  const { id } = useParams();

  const recipeId = id;
  console.log("recipeIDDDD", recipeId);

  const { addToFavorites, user } = useContext(UserContext);
  const { getSingleRecipe, isLoading, singleRecipe } =
    useContext(RecipeContext);

  console.log("single", singleRecipe);

  useEffect(() => {
    getSingleRecipe(recipeId);
  }, [recipeId]);

  const {
    _id,
    title,
    image,
    favorite,
    link,
    time,
    instructions,
    ingredients,
    nutrients,
    yields,
  } = singleRecipe;

  console.log(instructions);

  const currentUser = {
    recipeId: _id,
    userId: user._id,
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.pageWrapper}>
      {!isLoading && (
        <div>
          <div>
            <Link to="/recipes" className={styles.exitContainer}>
              <AiFillCloseSquare className={styles.exitIcon} />
            </Link>
            <img className={styles.recipeImage} src={image} alt={title} />
            <button
              onClick={(e) => addToFavorites(currentUser)}
              className={styles.heartContainer}
            >
              <BsSuitHeartFill
                className={favorite ? styles.fillHeartIcon : styles.heartIcon}
              />
            </button>
          </div>
          <div className={styles.recipeContainer}>
            <div>
              <div className={styles.textContainer}>
                <h1>{title}</h1>
                <p>{time} min</p>
              </div>
              <div className={styles.ingContainer}>
                <h2>Ingredients</h2>
                <h2>Servings: {yields}</h2>
              </div>
              <div className={styles.ingList}>
                {ingredients &&
                  ingredients.map((ingredient, index) => {
                    return <li key={index}>{ingredient}</li>;
                  })}
              </div>
              <div className={styles.ingContainer}>
                <h2>Instructions:</h2>
              </div>
              <div className={styles.ingList}>{instructions}</div>
            </div>

            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className={styles.recipeBtn}
            >
              See Full Recipe
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodRecipe;
