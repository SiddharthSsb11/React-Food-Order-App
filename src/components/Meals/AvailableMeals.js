import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card"
import MealItem from './MealItem/MealItem';

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Pizza",
    description: "Finest cheese and toppings",
    price: 282.99,
  },
  {
    id: "m2",
    name: "Chole-Bhatture",
    description: "A Punjabi specialty!",
    price: 160.5,
  },
  {
    id: "m3",
    name: "Overloaded Burger",
    description: "Fresh, raw, crispy",
    price: 140.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 180.99,
  },
];

const AvailableMeals = () => {
    
  const mealsList = DUMMY_MEALS.map((meal) =>(
      //console.log({...meal})/////<MealItem key={meal.id} {...meal} />)
      <MealItem //{...meal}
        id = {meal.id} //for form input id individuality //for item obj which to be added inside the card through ctx 
        key = {meal.id}
        name = {meal.name}
        description = {meal.description}
        price = {meal.price}>      
      </MealItem>
    ));

    

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>  
      
    </section>
  );
};

export default AvailableMeals;
