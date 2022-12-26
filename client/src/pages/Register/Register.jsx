import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import clsx from "clsx";
import Alert from "../../components/Alert/Alert";
import UserContext from "../../context/user_context";
import FormRow from "../../components/FormRow/FormRow";

const initialState = {
  name: "",
  lastName: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const { isLoading, showAlert, displayAlert, setupUser, user } =
    useContext(UserContext);
  const [values, setValues] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, lastName, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name && !lastName)) {
      displayAlert();
      return;
    }
    const currentUser = { name, lastName, email, password };
    if (isMember) {
      setupUser({
        currentUser,
        endPoint: "login",
        alertText: "Login Successful. Redirecting...",
      });
    } else {
      setupUser({
        currentUser,
        endPoint: "register",
        alertText: "Successfully Created Account. Redirecting...",
      });
    }
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    }
  }, [user, navigate]);
  return (
    <div className="pageWrapper">
      <form className="form" onSubmit={onSubmit}>
        <h3 className="title">{values.isMember ? "Login" : "Register"}</h3>
        <div>{showAlert && <Alert />}</div>
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}
        {!values.isMember && (
          <FormRow
            type="text"
            labelText="last name"
            name="lastName"
            value={values.lastName}
            handleChange={handleChange}
          />
        )}

        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />

        <button type="submit" className={clsx("btn")} disabled={isLoading}>
          Submit
        </button>
        <div className={styles.memberContainer}>
          <p className={styles.memberText}>
            {values.isMember ? "Not a member yet?" : "Already a member"}
          </p>
          <button
            type="button"
            onClick={toggleMember}
            className={styles.memberBtn}
          >
            {values.isMember ? "Register" : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
