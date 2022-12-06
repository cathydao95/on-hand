import styles from "./styles.module.scss";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import RecipeContext from "../../context/recipe_context";
import { AiFillCloseSquare } from "react-icons/ai";
import { BsSuitHeartFill } from "react-icons/bs";
// import { useRecipeContext } from "../../context/recipe_context";
// individual receipe page for an item, may need to rename

const FoodRecipe = () => {
  const { id } = useParams();

  const { getSingleRecipe, singleRecipe, addToFavorite } =
    useContext(RecipeContext);

  useEffect(() => {
    getSingleRecipe(id);
  }, [id]);

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

  console.log("favorite", favorite);

  return (
    <div className={styles.pageWrapper}>
      <div>
        <Link to="/recipes" className={styles.exitContainer}>
          <AiFillCloseSquare className={styles.exitIcon} />
        </Link>
        <img className={styles.recipeImage} src={image} alt={title} />
        <button
          onClick={(e) => addToFavorite(_id)}
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
            {ingredients.map((ingredient, index) => {
              return <li key={index}>{ingredient}</li>;
            })}
          </div>
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
  );
};

export default FoodRecipe;
