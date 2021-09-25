import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmountBill: 0
} ;

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    
    const updatedTotalAmountBill = +(state.totalAmountBill + (action.item.price * action.item.amount));
    //console.log(updatedTotalAmountBill,'reducer')
    
    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);
    const existingCartItem = state.items[existingCartItemIndex];
    //to sum above steps use directly find() method to get the item directly
    let updatedItems;
    //console.log(existingCartItem, existingCartItemIndex)

    if(existingCartItem){
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      }

      updatedItems = [...state.items]; //copying the state cart items to update this referential value immutably
      updatedItems[existingCartItemIndex] = updatedItem;
    }else{
      updatedItems = state.items.concat(action.item);//[..state.items, action.item]
    }

   /*  const index = state.items.findIndex(el => el.id === action.item.id);
      if (index === -1) {
         updatedItems = [...state.items, action.item];
      } else {
         updatedItems = [...state.items];
         updatedItems[index].amount += action.item.amount;
      } */
    
    return {
      items: updatedItems,
      totalAmountBill: updatedTotalAmountBill
    };
  }
  
  if(action.type === 'REMOVE'){

    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);
    const existingCartItem = state.items[existingCartItemIndex];
    //console.log(existingCartItem, 'index', existingCartItemIndex);
    let updatedItems;
    const updatedTotalAmountBill = state.totalAmountBill - existingCartItem.price;

    if(existingCartItem.amount === 1){ 
      updatedItems = state.items.filter((item) => item.id !== existingCartItem.id)//(item) => item.id !== action.id
    }else{
      const updatedItem = { ...existingCartItem, amount: existingCartItem.amount - 1 };
      updatedItems = [...state.items];
      //console.log(updatedItems)
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    /* const index = state.items.findIndex(el => el.id === action.id);
      if (state.items[index].amount === 1) {
         updatedItems = state.items.filter(el => el.id !== action.id);
      } else {
         updatedItems = [...state.items];
         updatedItems[index].amount -= 1;
      } */
    //if(updatedTotalAmount < 0) updatedTotalAmount = 0;
    return {
      items: updatedItems,
      totalAmountBill: updatedTotalAmountBill
    };
  }

  if(action.type === 'CLEAR'){
    return defaultCartState;
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

  const clearCartHandler = () => {
    dispatchCartAction({type: 'CLEAR'});
  }

  //console.log('Beofre', cartState.totalAmountBill);
  

  const cartContext = {
    items: cartState.items,
    totalAmountBill: cartState.totalAmountBill,
    addItem: addItemToCartHandler, 
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };
 // console.log(cartState.totalAmountBill,'Just do It', cartContext.totalAmountBill)
  //console.log(typeof cartState.totalAmountBill, typeof cartContext.totalAmountBill);
  //console.log(cartState.items,'ctx', cartContext.items)
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider; 