import React, { useState} from 'react';
import Header from './components/Layout/Header'
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart'
import CartProvider from './store/CartProvider';

function App() {
  
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  }

  //one Handler Only
  /* const showModalHandler = () => {
    setShowModal((prevState) => {
      return !prevState;
    });
  } */

  const hideCartHandler = () => {
    setCartIsShown(false);
  }

  return (
    <CartProvider>

      {cartIsShown && <Cart onClose={hideCartHandler}></Cart>}
      <Header onShowCart = {showCartHandler}></Header>
      <main>
        <Meals />
      </main>
      
    </CartProvider>
  );
}

export default App;
