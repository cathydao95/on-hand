import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>On Hand</h1>
        <div className={styles.btnContainer}>
          <Link to="/register" className={styles.loginBtn}>
            Login
          </Link>
          <Link to="/register" className={styles.createBtn}>
            Create New Account
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Home;
