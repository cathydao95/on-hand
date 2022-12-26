import styles from "./styles.module.scss";
const FormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className={styles.formRow}>
      <label htmlFor={name} className={styles.formLabel}>
        {labelText || name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className={name === "image" ? styles.imageInput : styles.formInput}
      />
    </div>
  );
};

export default FormRow;
