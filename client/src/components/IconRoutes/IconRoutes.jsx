import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";
import { IconContext } from "react-icons";
import {
  AiFillHome,
  AiOutlineSearch,
  AiFillHeart,
  AiOutlinePlus,
} from "react-icons/ai";

const IconRoutes = () => {
  return (
    <nav className={styles.navContainer}>
      <div className={styles.iconContainer}>
        <IconContext.Provider value={{ color: "grey", size: "25px" }}>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? styles.linkActive : styles.link
            }
          >
            <div className={styles.linkContainer}>
              <AiFillHome />
              <span>Home</span>
            </div>
          </NavLink>
          <NavLink
            to="/search"
            className={({ isActive }) =>
              isActive ? styles.linkActive : styles.link
            }
          >
            <div className={styles.linkContainer}>
              <AiOutlineSearch /> <span>Search</span>
            </div>
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive ? styles.linkActive : styles.link
            }
          >
            <div className={styles.linkContainer}>
              <AiFillHeart /> <span>Favorites</span>
            </div>
          </NavLink>
          <NavLink
            to="/myrecipes"
            className={({ isActive }) =>
              isActive ? styles.linkActive : styles.link
            }
          >
            <div className={styles.linkContainer}>
              <AiOutlinePlus /> <span>Recipes</span>
            </div>
          </NavLink>
        </IconContext.Provider>
      </div>
    </nav>
  );
};
export default IconRoutes;
