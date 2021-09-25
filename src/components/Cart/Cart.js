import React, {useState, useContext} from 'react'
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';


const Cart = (props) => {

  const [isCheckout, setIsCheckout] = useState(false)

  const cartCtx = useContext(CartContext);
  const totalAmountBill = `₹${cartCtx.totalAmountBill.toFixed(2)}`;
  //console.log(totalAmountBill, 'Cart.ks',  cartCtx.totalAmountBill)
  const cartHasItems = cartCtx.items.length > 0; //prefer useStae and if else to manage this 

  const cartItemnRemoveItemHandler = (id) => {
    cartCtx.removeItem(id);
  }

  const cartAddItemHandler = (item) => {
    cartCtx.addItem({...item, amount: 1} );
    //cartAddItemHandler.bind(null, item) //{()=>cartAddItemHandler(item)}
  }

  const orderHandler = ()=>{
    setIsCheckout(true);
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

  const callToAction = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {cartHasItems && <button className={classes.button} onClick = {orderHandler}>Order</button>}
    </div>
  );

  return (
    <Modal onBackdropClick={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmountBill}</span>
      </div>
      {isCheckout && <Checkout onCancel={props.onClose}></Checkout>}
      {!isCheckout && callToAction}
    </Modal>
  );
};

export default Cart;
