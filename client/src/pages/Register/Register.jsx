import { useState } from "react";
import styles from "./styles.modules.scss";
import Alert from "../../components/Alert/Alert";

const intitialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
  showAlert: true,
};

const Register = () => {
  const [values, setValues] = useState(intitialState);
  //   global state and use navigate

  const handleChange = (e) => {
    console.log(e.target);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  return (
    <div className={styles.pageWrapper}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {values.showAlert && <Alert />}
        {!values.isMember && (
          <div className={styles.formRow}>
            <label htmlFor="name" className={styles.formLabel}>
              Name
            </label>
            <input
              type="text"
              value={values.name}
              name="name"
              onChange={handleChange}
              className={styles.formInput}
            />
          </div>
        )}
        <div className={styles.formRow}>
          <label htmlFor="email" className={styles.formLabel}>
            Email
          </label>
          <input
            type="email"
            value={values.email}
            name="email"
            onChange={handleChange}
            className={styles.formInput}
          />
        </div>
        <div className={styles.formRow}>
          <label htmlFor="password" className={styles.formLabel}>
            Password
          </label>
          <input
            type="password"
            value={values.password}
            name="password"
            onChange={handleChange}
            className={styles.formInput}
          />
        </div>
        <button type="submit" className={styles.submitBtn}>
          Submit
        </button>
        <p>{values.isMember ? "Not a member yet" : "Already a member"}</p>
        <button
          type="button"
          onClick={toggleMember}
          className={styles.memberBtn}
        >
          {values.isMember ? "Register" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Register;
