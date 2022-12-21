import React, { useContext } from "react";
import { UserContext } from "../../context/user_context";

const Alert = () => {
  const { alertText, alertType } = useContext(UserContext);

  return (
    <div className={alertType === "danger" ? "alertDanger" : "alertSuccess"}>
      {alertText}
    </div>
  );
};

export default Alert;
