import React, { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

/* const DUMMY_MEALS = [
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
]; */

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(); //useState(null);

  useEffect(() => {
    const fetchRequest = async () => {
      setIsLoading(true);

      const response = await fetch(
        "https://react-food-order-fcb5a-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
      );

      if (!response.ok) {
        throw new Error("Somnething went Wrong!");
      }
      const data = await response.json();

      /* const mealsData = [];

        for (const key in responseData) {
          mealsData.push({
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price,
          });
        } */

      const mealsData = Object.entries(data).map(([key, value]) => {
        return {
          id: key,
          name: value.name,
          description: value.description,
          price: value.price,
        };
      });

      setMeals(mealsData);
      //console.log(mealsData);
      setIsLoading(false);
    };

    fetchRequest().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    }); //using then/catch clause to deal with fetchrequest promise; avoiding awaiting the promise returned by fetchReq func
    //thus avoiding try/catch; avoiding async of our useEffect cb func; as useEffect expects return cleanup sync only
    /* setIsLoading(false); */
  }, []);

  const mealsList = meals.map((meal) => (
    //console.log({...meal})/////<MealItem key={meal.id} {...meal} />)
    <MealItem //{...meal}
      id={meal.id} //for form input id individuality //for item obj which to be added inside the card through ctx
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    ></MealItem>
  ));

  //let content = <ul>{mealsList}</ul> ;

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.mealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
