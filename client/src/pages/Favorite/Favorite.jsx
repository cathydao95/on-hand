import styles from "./styles.module.scss";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { IoHeartCircleSharp } from "react-icons/io5";
import UserContext from "../../context/user_context";
import SingleRecipe from "../../components/SingleRecipe/SingleRecipe";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
const Favorite = () => {
  const { favorites } = useContext(UserContext);

  return (
    <div>
      <Navbar />
      <div className="pageWrapper">
        {favorites && favorites.length ? (
          <div>
            <h1 className="title">My Favorites</h1>

            <div className="container">
              {favorites.map((ele, index) => {
                return <SingleRecipe key={index} {...ele} />;
              })}
            </div>
          </div>
        ) : (
          <div className={styles.noFavsContainer}>
            <IoHeartCircleSharp className={styles.heartIcon} />
            <div className={styles.textContainer}>
              <h1>No Favorites Yet</h1>
              <p>Like a recipe you see? Save them here to your favorites!</p>
            </div>
            <Link to="/search" className={clsx(styles.exploreBtn, "btn")}>
              START EXPLORING
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};
export default Favorite;
