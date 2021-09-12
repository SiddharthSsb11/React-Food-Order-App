import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmountBill: 0
} ;

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedItems = state.items.concat(action.item);//[..state.items, action.item]
    const updatedTotalAmountBill = state.totalAmount + action.item.price * action.item.amount;
    return {
      items: updatedItems,
      totalAmountBill: updatedTotalAmountBill.toFixed(2)
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

  console.log('Beofre', cartState.totalAmountBill);

  const cartContext = {
    items: cartState.items,
    totalAmountBill: cartState.totalAmountBill,
    addItem: addItemToCartHandler, 
    removeItem: removeItemFromCartHandler,
  };
  console.log(cartState.totalAmountBill,'Just do It', cartContext.totalAmountBill)

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider; 