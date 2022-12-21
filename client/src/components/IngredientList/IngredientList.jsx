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
    examples: [
      "salmon",
      "tuna",
      "crab",
      "crayfish",
      "prawns",
      "scallops",
      "lobster",
      "octopus",
      "squid",
      "shrimp",
      "oyster",
      "clams",
    ],
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
      "mushroom",
      "celery",
      "spinach",
      "kale",
      "corn",
      "green beans",
      "cabbage",
      "sweet potato",
      "arugula",
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
      "watermeon",
      "plum",
    ],
  },
  {
    name: "dairy",
    examples: [
      "milk",
      "yogurt",
      "cream",
      "coconut milk",
      "cheese",
      "cream cheese",
      "heavy cream",
      "sour cream",
      "butter",
    ],
  },
  {
    name: "canned goods/misc",
    examples: [
      "tomato sauce",
      "tomato paste",
      "kidney beans",
      "chickpeas",
      "black beans",
      "chili",
      "chicken broth",
      "beef broth",
      "seaweed",
    ],
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
  {
    name: "grains",
    examples: [
      "rice",
      "pasta",
      "oat",
      "tortillas",
      "quinoa",
      "bread",
      "vermicelli",
      "udon",
      "rice cake",
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
