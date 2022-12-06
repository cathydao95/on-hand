import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import FavoritedRecipe from "../../components/FavoritedRecipe/FavoritedRecipe";
import RecipeContext from "../../context/recipe_context";
import { IoHeartCircleSharp } from "react-icons/io5";

const Favorite = () => {
  const { favoriteList, getFavorites } = useContext(RecipeContext);
  const [expand, setExpand] = useState(false);

  const expandList = () => {
    setExpand(!expand);
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <div>
      {favoriteList && favoriteList.length ? (
        <div className={styles.pageWrapper}>
          <div className={styles.textContainer}>
            <h1 className={styles.title}>My Favorites</h1>
            {favoriteList && favoriteList.length > 4 && !expand && (
              <button className={styles.allBtn} onClick={expandList}>
                See All
              </button>
            )}
          </div>
          <div className={styles.favoritesContainer}>
            {expand
              ? favoriteList.map((ele, index) => {
                  return <FavoritedRecipe key={index} {...ele} />;
                })
              : favoriteList.slice(0, 4).map((ele, index) => {
                  return <FavoritedRecipe key={index} {...ele} />;
                })}
          </div>
        </div>
      ) : (
        <div className={styles.noFavs}>
          <IoHeartCircleSharp className={styles.heartIcon} />
          <div className={styles.textContainer}>
            <h1 className={styles.noFavsTitle}>No Favorites Yet</h1>
            <p>Like a recipe you see? Save them here to your favorites!</p>
          </div>
          <Link to="/recipes" className={styles.exploreBtn}>
            START EXPLORING
          </Link>
        </div>
      )}
    </div>
  );
};
export default Favorite;

// {favoriteList.map((ele, index) => {
//   return <FavoritedRecipe key={index} {...ele} />;
//    }
