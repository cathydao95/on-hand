import styles from "./styles.module.scss";
const FormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className={styles.formRow}>
      <label htmlFor="name" className={styles.formLabel}>
        {labelText || name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className={styles.formInput}
      />
    </div>
  );
};

export default FormRow;
