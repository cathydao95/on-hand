import styles from "./styles.module.scss";
import clsx from "clsx";
import { useState, useContext } from "react";
import { UserContext } from "../../context/user_context";
import FormRow from "../../components/FormRow/FormRow";
import Alert from "../../components/Alert/Alert";

//  REFACTOR FORM ROWS INTO A NEW COMPONENT FOR RECIPE AND REGISTER

const Account = () => {
  const { user, logOutUser, showAlert, displayAlert, updateUser, isLoading } =
    useContext(UserContext);
  const [name, setName] = useState(user?.name);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !lastName || !email) {
      displayAlert();
      return;
    }

    updateUser({ name, email, lastName });
  };

  return (
    <div className={styles.pageWrapper}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h3 className={clsx(styles.title, "container")}>User Profile</h3>
        {showAlert && <Alert />}
        <FormRow
          type="text"
          name="name"
          value={name}
          handleChange={(e) => setName(e.target.value)}
        />

        <FormRow
          type="text"
          labelText="last name"
          name="lastName"
          value={lastName}
          handleChange={(e) => setLastName(e.target.value)}
        />
        <FormRow
          type="email"
          name="email"
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className={clsx("btn")} disabled={isLoading}>
          {isLoading ? "Loading..." : "Save Changes"}
        </button>
      </form>
      <button type="button" className="btn" onClick={logOutUser}>
        logout
      </button>
    </div>
  );
};

export default Account;
