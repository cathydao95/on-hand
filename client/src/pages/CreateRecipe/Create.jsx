import styles from "./styles.module.scss";

const Create = () => {
  return (
    <div className={styles.pageWrapper}>
      <div>
        <h1>Create Recipe</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Recipe Name" name="name" />
          <div>
            <label>Serves</label>
            <input type="number" name="serves" />
          </div>
          <div>
            <label>Cook Time</label>
            <input type="text" name="times" />
          </div>
          <label>Ingredients</label>
          <div>
            <input type="text" name="ingredient" />
            <input type="text" />
          </div>
          <div>
            <input type="text" name="ingredient" />
            <input type="text" />
          </div>
          <div>
            <input type="text" name="ingredient" />
            <input type="text" />
          </div>
          <button className={styles.addBtn}>+ Add new ingredient</button>
          <button className={styles.saveBtn}>Save My Recipe</button>
        </form>
      </div>
    </div>
  );
};
export default Create;
