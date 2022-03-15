import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as storage from '../services/handleStorage';

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    const productsInCartString = localStorage.getItem('productsInCart');
    if (productsInCartString === null) {
      this.state = {
        productsInCartArray: [],
      };
      localStorage.setItem('productsInCart', '[]');
    } else {
      const productsInCartArray = JSON.parse(productsInCartString);
      this.state = {
        productsInCartArray,
      };
    }
  }

  render() {
    const { productsInCartArray } = this.state;
    return (
      <div>
        {productsInCartArray.length ? (
          <Link to="/checkout" data-testid="checkout-products">Finalizar compra</Link>
        ) : ''}
        {productsInCartArray.length ? (
          productsInCartArray.map((element) => (
            <div key={ element.allInfos.id }>
              <h3 data-testid="shopping-cart-product-name">
                { element.allInfos.title }
              </h3>
              <img src={ element.allInfos.thumbnail } alt={ element.allInfos.title } />
              <p>
                Quantidade:
                {' '}
                <span data-testid="shopping-cart-product-quantity">
                  {element.quantity}
                </span>
              </p>
              <p>
                Preço
                {': '}
                { (element.allInfos.price * element.quantity).toFixed(2) }
              </p>
              <button
                type="button"
                data-testid="product-increase-quantity"
                disabled={ element.quantity >= element.allInfos.available_quantity }
                onClick={ () => this.setState({
                  productsInCartArray: storage.addToCart(element.allInfos),
                }) }
              >
                Mais um
              </button>
              <button
                type="button"
                data-testid="product-decrease-quantity"
                disabled={ element.quantity <= 1 }
                onClick={ () => this.setState({
                  productsInCartArray: storage.descreaseInCart(element.allInfos),
                }) }
              >
                Menos um
              </button>
              <button
                type="button"
                data-testid="product-decrease-quantity"
                onClick={ () => this.setState({
                  productsInCartArray: storage.removeFromCart(element.allInfos),
                }) }
              >
                Remover do carrinho
              </button>
            </div>
          ))
        ) : (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio.
          </p>
        )}
      </div>
    );
  }
}

export default ShoppingCart;
