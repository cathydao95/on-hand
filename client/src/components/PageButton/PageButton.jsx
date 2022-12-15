import { useState, useContext } from "react";
import styles from "./styles.module.scss";
import RecipeContext from "../../context/recipe_context";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

const PageButton = () => {
  const { numOfPages, page, changePage, limit, changeLimit } =
    useContext(RecipeContext);

  const [selectPage, setSelectPage] = useState(page);
  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      newPage = 1;
    }
    changePage(newPage);
  };
  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numOfPages;
    }
    changePage(newPage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    changePage(selectPage);
  };

  console.log(selectPage);
  return (
    <div className={styles.containerWrapper}>
      <button className={styles.prevBtn} onClick={prevPage}>
        <HiChevronDoubleLeft />
        {/* prev */}
      </button>
      <form className={styles.inputContainer} onSubmit={(e) => handleSubmit(e)}>
        <span>Page</span>
        <input
          className={styles.input}
          type="number"
          value={selectPage}
          onChange={(e) => setSelectPage(e.target.value)}
          min="1"
          max={numOfPages}
        ></input>
        <span>of</span>
        {numOfPages}

        <select
          className={styles.select}
          value={limit}
          size="4"
          onChange={(e) => changeLimit(e.target.value)}
        >
          <option value="12" className={styles.option}>
            12
          </option>
          <option value="24">24</option>
          <option value="48">48</option>
          <option value="60">60</option>
        </select>
      </form>

      <button className={styles.nextBtn} onClick={nextPage}>
        {/* next */}
        <HiChevronDoubleRight />
      </button>
    </div>
  );
};

export default PageButton;
