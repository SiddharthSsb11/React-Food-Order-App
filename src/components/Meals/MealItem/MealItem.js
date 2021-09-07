import React from 'react'
import classes from './MealItem.module.css'

const MealItem = (props) => {

    const price = `$${props.price.toFixed(2)}`;
    //prefer p tags inside a li tag instead of divs
    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <p className={classes.description}>{props.description}</p> 
                <p className={classes.price}>{price}</p>
            </div>

            <div></div>
        </li>            
    )
}

export default MealItem