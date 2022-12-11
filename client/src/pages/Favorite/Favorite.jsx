import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import FavoritedRecipe from "../../components/FavoritedRecipe/FavoritedRecipe";
import RecipeContext from "../../context/recipe_context";
import { IoHeartCircleSharp } from "react-icons/io5";
import clsx from "clsx";
import { UserContext } from "../../context/user_context";

const Favorite = () => {
  const { getUserFavorites, user, token, favorites } = useContext(UserContext);

  // ISNT WORKING TO FETCH FAVORITES.. BUT DO WE NEED?
  // let userId = user._id;

  // useEffect(() => {
  //   getUserFavorites(userId);
  // }, []);

  // if use favorites.. doesnt work until click faovirtes button.. need to figure out how to render info on load

  const [expand, setExpand] = useState(false);

  const expandList = () => {
    setExpand(!expand);
  };

  return (
    <div>
      {favorites && favorites.length ? (
        <div className={styles.pageWrapper}>
          <div className={styles.textContainer}>
            <h1 className={styles.title}>My Favorites</h1>
            {favorites && favorites.length > 4 && !expand && (
              <button className={styles.allBtn} onClick={expandList}>
                See All
              </button>
            )}
          </div>
          <div className={styles.favoritesContainer}>
            {expand
              ? favorites.map((ele, index) => {
                  return <FavoritedRecipe key={index} {...ele} />;
                })
              : favorites.slice(0, 4).map((ele, index) => {
                  return <FavoritedRecipe key={index} {...ele} />;
                })}
          </div>
        </div>
      ) : (
        <div className={styles.noFavs}>
          <IoHeartCircleSharp className={styles.heartIcon} />
          <div className={styles.textContainer}>
            <h1>No Favorites Yet</h1>
            <p>Like a recipe you see? Save them here to your favorites!</p>
          </div>
          <Link to="/recipes" className={clsx("btn")}>
            START EXPLORING
          </Link>
        </div>
      )}
    </div>
  );
};
export default Favorite;
