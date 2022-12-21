import styles from "./styles.module.scss";
import IconRoutes from "../IconRoutes/IconRoutes";

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.navContainer}>
        <IconRoutes />
      </div>

      <div className={styles.footerText}>
        ©2022 On Hand. Designed and Coded by CD.
      </div>
    </div>
  );
};

export default Footer;
