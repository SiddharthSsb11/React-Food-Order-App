import React from "react";
import classes from "./HeaderCartButton.module.css";

import CartIcon from "../Cart/CartIcon";

const HeaderCartButton = (props) => {
  return (
    <button className={classes.button} onClick = {props.onClickCartIcon}>
      <span className={classes.icon}>
        <CartIcon></CartIcon>
      </span>
      <span> Your Cart </span>
      <span className={classes.badge}> 3 </span>
    </button>
  );
};

export default HeaderCartButton;
