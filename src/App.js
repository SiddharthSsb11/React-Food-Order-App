import React, {Fragment} from 'react';
import Header from './components/Layout/Header'
import Meals from './components/Meals/Meals';

function App() {
  return (
    <Fragment>
      <Header></Header>
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
