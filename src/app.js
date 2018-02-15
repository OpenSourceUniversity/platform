import React from 'react';
import './util/web3/getWeb3';

// Layouts
import Header from './components/Header';
import Main from './components/Main';

// Redux Store
import './store';


const App = () => (
  <div className="App">
    <Header />

    <div id="Main">
      <Main />
    </div>
  </div>
);


export default App;
