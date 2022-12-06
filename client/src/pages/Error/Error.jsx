import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import img from "../../assets/not-found.jpg";

const Error = () => {
  return (
    <div className={styles.pageWrapper}>
      <div>
        <img className={styles.errorImage} src={img} alt="not found" />
        <h3>Oh no! Page not found</h3>
        <p>We can't seem to find the page you're looking for</p>
        <Link to="/">back home</Link>
      </div>
    </div>
  );
};

export default Error;
