import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import ShoppingCart from './components/ShoppingCart';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsInCart: [],
    };
  }

  addingToCart = (product) => {
    const { productsInCart: newProductsInCart } = this.state;
    newProductsInCart.push(product);
    this.setState({ productsInCart: newProductsInCart });
  }

  render() {
    const { productsInCart } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ () => <Home addingToCart={ this.addingToCart } /> }
          />
          <Route
            exact
            path="/shopping-cart"
            render={ () => <ShoppingCart productsInCart={ productsInCart } /> }
          />
          <Route
            exact
            path="/product/:id"
            render={ (props) => <ProductDetails { ...props } /> }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
