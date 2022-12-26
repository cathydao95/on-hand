import styles from "./styles.module.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import RecipeContext from "../../context/recipe_context";
import { AiFillCloseSquare } from "react-icons/ai";
import { BsSuitHeartFill } from "react-icons/bs";
import UserContext from "../../context/user_context";
import Loading from "../../components/Loading/Loading";

const FoodRecipe = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const recipeId = id;

  const { addToFavorites, user } = useContext(UserContext);
  const { getSingleRecipe, isLoading, singleRecipe } =
    useContext(RecipeContext);

  useEffect(() => {
    getSingleRecipe(recipeId);
  }, []);

  const { _id, title, image, link, time, instructions, ingredients, yields } =
    singleRecipe;

  let isFavorite = user.favorites.includes(_id);

  let isPersonal = user.personalRecipes.includes(_id);

  const currentUser = {
    recipeId: _id,
    userId: user._id,
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.pageWrapper}>
      {Object.keys(singleRecipe).length !== 0 ? (
        <div>
          <div>
            {!isPersonal && (
              <button
                onClick={(e) => addToFavorites(currentUser)}
                className={styles.heartContainer}
              >
                <BsSuitHeartFill
                  className={isFavorite ? "fillHeartIcon" : "heartIcon"}
                />
              </button>
            )}
            {/* <button
              onClick={() => navigate(-1)}
              className={styles.exitContainer}
            >
              <AiFillCloseSquare className={styles.exitIcon} />
            </button> */}
            {image !== "" ? (
              <img className={styles.recipeImage} src={image} alt={title} />
            ) : (
              <div className={styles.noRecipeImage}></div>
            )}
            {/* {!isPersonal && (
              <button
                onClick={(e) => addToFavorites(currentUser)}
                className={styles.heartContainer}
              >
                <BsSuitHeartFill
                  className={isFavorite ? "fillHeartIcon" : "heartIcon"}
                />
              </button>
            )} */}
            <button
              onClick={() => navigate(-1)}
              className={styles.exitContainer}
            >
              <AiFillCloseSquare className={styles.exitIcon} />
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
                <div className={styles.servingsContainer}>
                  <h2>Servings:</h2>
                  <p>{yields}</p>
                </div>
              </div>
              <div className={styles.ingList}>
                {ingredients &&
                  ingredients.map((ingredient, index) => {
                    return (
                      <li className={styles.ing} key={index}>
                        {ingredient}
                      </li>
                    );
                  })}
              </div>
              <div className={styles.ingContainer}>
                <h2>Instructions:</h2>
              </div>
              <div className={styles.ingList}>
                {instructions &&
                  instructions.map((step, index) => {
                    return (
                      <div key={index} className={styles.step}>
                        {index + 1}. {step}
                      </div>
                    );
                  })}
              </div>
            </div>

            {!isPersonal && (
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className={styles.recipeBtn}
              >
                See Full Recipe
              </a>
            )}
          </div>
        </div>
      ) : (
        <div>
          <Loading />
        </div>
      )}
    </div>
  );
};

export default FoodRecipe;
