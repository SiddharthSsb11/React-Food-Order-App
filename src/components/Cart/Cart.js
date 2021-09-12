import React, {useContext} from 'react'
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';



const Cart = (props) => {

  const cartCtx = useContext(CartContext);
  const totalAmountBill = `$${cartCtx.totalAmountBill.toFixed(2)}`;
  const cartEmpty = cartCtx.items.length > 0; //prefer useStae and if else to manage this 

  const cartItemnRemoveItemHandler = (id) => {
    cartCtx.removeItem(id);
  }

  const cartAddItemHandler = (item) => {
    cartCtx.addItem(item);
  }

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem 
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove = {cartItemnRemoveItemHandler.bind(null, item.id)}
          onAdd = {cartAddItemHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onBackdropClick={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmountBill}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick = {props.onClose}>Close</button>
        {cartEmpty && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
