import React, { Component } from 'react';

import './App.css';

import Search from './../components/Search';
import Products from './../components/Products';

class App extends Component {
  render() {
    return (
      <div>
        <Search/>
        <Products/>
      </div>
    );
  }
}

export default App;
