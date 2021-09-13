import React, {useContext} from  'react'
import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm';
import CartContext from '../../../store/cart-context';


const MealItem = (props) => {

    const cartCtx = useContext(CartContext);

    const pricesForm = `₹${props.price.toFixed(2)}`;

    const addToCartHandler = (amount) => {
        cartCtx.addItem({//...props.meal
            id: props.id,
            name: props.name,
            amount: +(amount),//amount:amount
            price: +(props.price)
        })
    };
    //prefer p tags inside a li tag instead of divs
    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <p className={classes.description}>{props.description}</p> 
                <p className={classes.price}>{pricesForm}</p>
            </div>

            <div>
                <MealItemForm id = {props.id} onAddToCart = {addToCartHandler} ></MealItemForm>
            </div>
        </li>            
    )
}

export default MealItem