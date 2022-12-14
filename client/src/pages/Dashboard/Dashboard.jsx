import { useEffect, useState } from "react";
import SingleRecipe from "../../components/SingleRecipe/SingleRecipe";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { AiOutlineSearch } from "react-icons/ai";
import { useContext } from "react";
import RecipeContext from "../../context/recipe_context";
import PageButton from "../../components/PageButton/PageButton";
import Loading from "../../components/Loading/Loading";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

// import { useRecipeContext } from "../../context/recipe_context";

const Dashboard = () => {
  const [userInput, setUserInput] = useState("");
  const navigate = useNavigate();

  const {
    recipes,
    getAllRecipes,
    clearValues,
    isLoading,
    page,
    limit,
    searchRecipeName,
  } = useContext(RecipeContext);

  useEffect(() => {
    clearValues();
    getAllRecipes();
  }, [page, limit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    searchRecipeName(userInput);
    navigate("/searchedrecipes");
  };

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Navbar />
      <div className="pageWrapper">
        <div>
          <h1 className="title">All Recipes</h1>
        </div>
        {/* determine how to implement search function here */}

        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={styles.formControl}>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search recipes"
              onChange={(e) => handleChange(e)}
              value={userInput}
            />
            <button className={styles.searchBtn}>
              <AiOutlineSearch className={styles.searchIcon} />
            </button>
          </div>
        </form>

        <div className="container">
          {recipes.map((ele, index) => {
            return (
              <SingleRecipe key={index} {...ele} />
              // <div className={styles.singleRecipeContainer} key={index}>
              //   <SingleRecipe key={index} {...ele} />
              // </div>
            );
          })}
        </div>
        <PageButton />
      </div>
      <Footer />
    </div>
  );
};
export default Dashboard;
