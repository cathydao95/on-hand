import styles from "./styles.module.scss";
import IngredientItem from "../IngredientItem/IngredientItem";

let list = [
  {
    name: "meats",
    examples: [
      "beef",
      "chicken",
      "eggs",
      "goat",
      "hot dogs",
      "pork",
      "bacon",
      "duck",
      "turkey",
      "lamb",
      "spam",
      "ham",
    ],
  },
  {
    name: "seafood",
    examples: ["salmon", "tuna", "crab", "lobster", "octupus", "squid"],
  },
  {
    name: "vegetables",
    examples: [
      "asparagus",
      "cauliflower",
      "potatoes",
      "tomatoes",
      "onions",
      "garlic",
      "carrots",
      "bell peppers",
      "broccoli",
      "cucumbers",
      "lettuce",
      "zucchini",
      "mushrooms",
      "celery",
      "spinach",
      "kale",
    ],
  },
  {
    name: "fruits",
    examples: [
      "apples",
      "avocados",
      "grapes",
      "bananas",
      "strawberries",
      "cherries",
      "oranges",
      "lemon",
      "blueberries",
      "blackberries",
      "pineapple",
      "mango",
      "lime",
    ],
  },
  {
    name: "canned goods",
    examples: ["salmon", "tuna", "crab", "lobster", "octupus", "squid"],
  },

  {
    name: "baking",
    examples: [
      "flour",
      "sugar",
      "baking powder",
      "baking soda",
      "vanilla extract",
      "brown sugar",
      "cocoa powder",
      "corn starch",
    ],
  },
  {
    name: "dairy",
    examples: [
      "milk",
      "yogurt",
      "cream",
      "cheese",
      "cream cheese",
      "heavy cream",
      "sour cream",
      "butter",
    ],
  },
  {
    name: "condiments",
    examples: [
      "ketchup",
      "mayo",
      "mustard",
      "soy sauce",
      "oyster sauce",
      "sesame oil",
      "gochujang",
      "teriyaki sauce",
      "fish sauce",
      "sriracha",
      "hot sauce",
      "worcestershire sauce",
    ],
  },
  {
    name: "spices",
    examples: [
      "cumin",
      "chili powder",
      "oregano",
      "paprika",
      "basil",
      "cayenne",
      "cinnamon",
      "parsley",
      "lemon pepper",
      "garlic salt",
      "garlic powder",
      "onion powder",
    ],
  },
  { name: "carbs", examples: ["rice", "pasta", "quinoa", "bread"] },
  {
    name: "canned foods/legumes",
    examples: [
      "chicken broth",
      "beef broth",
      "black beans",
      "chick peas",
      "tomato sauce",
      "lentils",
    ],
  },
];

const IngredientList = ({
  ingredients,
  setIngredients,
  setUserInput,
  userInput,
}) => {
  const addToIngredients = (ing) => {
    if (!ingredients.includes(ing)) {
      setIngredients((prev) => [...prev, ing]);
    } else {
      setIngredients((prev) => prev.filter((item) => item !== ing));
    }
  };
  return (
    <div>
      {list.map((item, index) => {
        const { name } = item;
        return (
          <div key={index} className={styles.categoryContainer}>
            <div className={styles.categoryText} key={index}>
              {name}:
            </div>
            <IngredientItem
              ingredients={ingredients}
              addToIngredients={addToIngredients}
              {...item}
            />
          </div>
        );
      })}
    </div>
  );
};

export default IngredientList;
