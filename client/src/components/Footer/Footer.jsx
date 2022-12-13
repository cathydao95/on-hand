import styles from "./styles.module.scss";
import Navbar from "../Navbar/Navbar";
import IconRoutes from "../IconRoutes/IconRoutes";

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.navContainer}>
        <IconRoutes />
      </div>

      <div>
        <div>©2022 On Hand. | Designed and Coded by CD.</div>
      </div>
    </div>
  );
};

export default Footer;
