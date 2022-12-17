import styles from "./styles.module.scss";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { IoHeartCircleSharp } from "react-icons/io5";
import { UserContext } from "../../context/user_context";
import SingleRecipe from "../../components/SingleRecipe/SingleRecipe";

const Favorite = () => {
  const { favorites } = useContext(UserContext);

  // Ended up getting favorites on user login.. why doesn't get work here?

  const [expand, setExpand] = useState(false);

  const expandList = () => {
    setExpand(!expand);
  };

  return (
    <div className="pageWrapper">
      {favorites && favorites.length ? (
        <div>
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
                  return <SingleRecipe key={index} {...ele} />;
                })
              : favorites.slice(0, 4).map((ele, index) => {
                  return <SingleRecipe key={index} {...ele} />;
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
