import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Checkout from './components/Checkout';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import ShoppingCart from './components/ShoppingCart';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ () => <Home /> }
          />
          <Route
            exact
            path="/shopping-cart"
            render={ () => <ShoppingCart /> }
          />
          <Route
            exact
            path="/product/:id"
            render={ (props) => (
              <ProductDetails { ...props } />
            ) }
          />
          <Route
            exact
            path="/checkout"
            component={ Checkout }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
