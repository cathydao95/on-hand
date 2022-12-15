import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import styles from "./styles.module.scss";
import IconRoutes from "../IconRoutes/IconRoutes";

import { UserContext } from "../../context/user_context";

const Navbar = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const { logOutUser, user } = useContext(UserContext);

  console.log(showDropDown);
  return (
    <nav className={styles.navContainer}>
      <div>
        <h1 className={styles.title}>On Hand</h1>
      </div>

      {user && (
        <div className={styles.accountContainer}>
          <button
            type="button"
            onClick={() => setShowDropDown(!showDropDown)}
            className={styles.accountBtn}
          >
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
      {/* <div className={styles.navContainer}>
        <div className={styles.navCenter}>
          
          <h1>On Hand</h1>
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
            to="/recipes"
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
            to="/create"
            className={({ isActive }) =>
              isActive ? styles.linkActive : styles.link
            }
          >
            Create Recipe
          </NavLink>
        </div>
        {user && (
          <div className={styles.accountContainer}>
            <div className={styles.accountWrapper}>
              <button
                type="button"
                onClick={() => setShowDropDown(!showDropDown)}
                className={styles.accountBtn}
              >
                <FaUserCircle />
                {user?.name}
                <FaCaretDown />
              </button>
              <div
                className={showDropDown ? styles.showDropDown : styles.dropDown}
              >
                <NavLink className={styles.settingsBtn} to="/account">
                  Account
                </NavLink>
                <button
                  type="button"
                  className={styles.btn}
                  onClick={logOutUser}
                >
                  logout
                </button>
              </div>
            </div>
          </div>
        )} */}
      {/* </div> */}
    </nav>
  );
};
export default Navbar;
