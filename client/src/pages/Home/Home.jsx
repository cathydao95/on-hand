import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../context/user_context";

const Home = () => {
  const { toggleRegistered } = useContext(UserContext);
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>On Hand</h1>
        <div className={styles.btnContainer}>
          <Link to="/register" className={styles.loginBtn}>
            Login/Register
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Home;
