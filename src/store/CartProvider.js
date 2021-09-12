import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmountBill: 0
} ;

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedItems = state.items.concat(action.item);//[..state.items, action.item]
    const updatedTotalAmountBill = +(state.totalAmountBill + (action.item.price * action.item.amount));
    console.log(updatedTotalAmountBill,'reducer')
    return {
      items: updatedItems,
      totalAmountBill: updatedTotalAmountBill
    };
  }
  return defaultCartState;  
}; 

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => { //item obj contains all the data i.e. name, amounts of the item, price etc
    dispatchCartAction({type: 'ADD', item: item});
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({type: 'REMOVE', id: id});
  };

  //console.log('Beofre', cartState.totalAmountBill);
  

  const cartContext = {
    items: cartState.items,
    totalAmountBill: cartState.totalAmountBill,
    addItem: addItemToCartHandler, 
    removeItem: removeItemFromCartHandler,
  };
 // console.log(cartState.totalAmountBill,'Just do It', cartContext.totalAmountBill)
  //console.log(typeof cartState.totalAmountBill, typeof cartContext.totalAmountBill);
  console.log(cartState.items,'ctx', cartContext.items)
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider; 