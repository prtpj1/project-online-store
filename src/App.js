import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import * as api from './services/api';
import Home from './components/Home';
import ShoppingCart from './components/ShoppingCart';
// Alteração Paulo

class App extends Component {
  async componentDidMount() {
    await api.getCategories();
    await api.getProductsFromCategoryAndQuery();
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/shopping-cart" component={ ShoppingCart } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
