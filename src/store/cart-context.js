import React from 'react';

const CartContext = React.createContext({
  items: [],
  totalAmountBill: 0,
  addItem: (item) => {},
  removeItem: (id) => {}
});
//dummy data fr better autocompletion
export default CartContext;