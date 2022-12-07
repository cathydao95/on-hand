import React, { useContext } from "react";
import { UserContext } from "../../context/user_context";
import styles from "./styles.modules.scss";

const Alert = () => {
  const { alertText, alertType } = useContext(UserContext);
  return (
    <div
      className={
        alertType === "danger" ? styles.alertDanger : styles.alertSuccess
      }
    >
      {alertText}
    </div>
  );
};

export default Alert;
