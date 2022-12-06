import { NavLink } from "react-router-dom";
import { useState } from "react";
import styles from "./styles.module.scss";
import { IconContext } from "react-icons";
import {
  AiFillHome,
  AiOutlineSearch,
  AiFillHeart,
  AiOutlinePlus,
} from "react-icons/ai";

const Navbar = () => {
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
            <AiFillHome
              className={({ isActive }) =>
                isActive ? styles.linkActive : styles.link
              }
            />
          </NavLink>
          <NavLink
            to="/recipes"
            className={({ isActive }) =>
              isActive ? styles.linkActive : styles.link
            }
          >
            <AiOutlineSearch />
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive ? styles.linkActive : styles.link
            }
          >
            <AiFillHeart />
          </NavLink>
          <NavLink
            to="/create"
            className={({ isActive }) =>
              isActive ? styles.linkActive : styles.link
            }
          >
            <AiOutlinePlus />
          </NavLink>
        </IconContext.Provider>
      </div>
    </nav>
  );
};
export default Navbar;
