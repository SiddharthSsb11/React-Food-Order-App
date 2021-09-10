import React from "react";
import { useContext } from "react";
import classes from "./HeaderCartButton.module.css";
import CartContext from '../../store/cart-context';
import CartIcon from "../Cart/CartIcon";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  //console.log(cartCtx.items, cartCtx)
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  return (
    <button className={classes.button} onClick={props.onClickCartIcon}>
      <span className={classes.icon}>
        <CartIcon></CartIcon>
      </span>
      <span> Your Cart </span>
      <span className={classes.badge}> {numberOfCartItems} </span>
    </button>
  );
};

export default HeaderCartButton;
