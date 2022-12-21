import styles from "./styles.module.scss";
import clsx from "clsx";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/user_context";
import RecipeContext from "../../context/recipe_context";
import { Link } from "react-router-dom";
import SingleRecipe from "../../components/SingleRecipe/SingleRecipe";
import Loading from "../../components/Loading/Loading";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

//  REFACTOR FORM ROWS INTO A NEW COMPONENT FOR RECIPE AND REGISTER

const PersonalRecipes = () => {
  const { personalRecipes, getPersonalRecipes, user } = useContext(UserContext);
  const { getAllRecipes, isLoading, clearValues } = useContext(RecipeContext);

  const userId = user._id;

  useEffect(() => {
    getAllRecipes();
    getPersonalRecipes(userId);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Navbar />
      <div className="pageWrapper">
        <h1 className="title">Personal Recipes</h1>

        <div className={styles.personalContainer}>
          {personalRecipes.length > 0 ? (
            <div className="container">
              {personalRecipes.map((rec, index) => {
                return <SingleRecipe key={index} {...rec} />;
              })}
            </div>
          ) : (
            <div className={styles.personalText}>
              <p>You have not created any personal recipes.</p>
              <p>Know a delicious recipe and want to add to our database?</p>
            </div>
          )}
          <div className={styles.btnContainer}>
            <Link to="/create" className={styles.createBtn}>
              + Create New Recipe
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PersonalRecipes;
