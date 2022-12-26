import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import styles from "./styles.module.scss";

import UserContext from "../../context/user_context";

const Navbar = () => {
  const { logOutUser, user } = useContext(UserContext);

  return (
    <nav className={styles.navContainer}>
      <div>
        <h1 className={styles.title}>On Hand</h1>
      </div>
      <div className={styles.navLinks}>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? styles.linkActive : styles.link
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/search"
          className={({ isActive }) =>
            isActive ? styles.linkActive : styles.link
          }
        >
          Search
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive ? styles.linkActive : styles.link
          }
        >
          Favorites
        </NavLink>
        <NavLink
          to="/myrecipes"
          className={({ isActive }) =>
            isActive ? styles.linkActive : styles.link
          }
        >
          Personal Recipes
        </NavLink>
      </div>
      {user && (
        <div className={styles.accountContainer}>
          <button type="button" className={styles.accountBtn}>
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={styles.dropDownContent}>
            <NavLink className={styles.settingsBtn} to="/account">
              Account
            </NavLink>
            <button type="button" className={styles.btn} onClick={logOutUser}>
              logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
