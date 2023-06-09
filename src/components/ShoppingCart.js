/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as storage from '../services/handleStorage';

import Header from './Header';
import { getSizeCart } from '../utils/cartIconFuncs';

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    const productsInCartString = localStorage.getItem('productsInCart');
    if (productsInCartString === null) {
      this.state = {
        numberItemsInCart: getSizeCart(),
        productsInCartArray: [],
      };
      localStorage.setItem('productsInCart', '[]');
    } else {
      const productsInCartArray = JSON.parse(productsInCartString);
      this.state = {
        numberItemsInCart: getSizeCart(),
        productsInCartArray,
      };
    }
  }

  render() {
    const {
      state: { numberItemsInCart, productsInCartArray },
    } = this;
    const totalQuantity = productsInCartArray
      .reduce((accumulator, element) => accumulator + element.quantity, 0);
    const totalPrice = productsInCartArray
      .reduce((accumulator, element) => (
        accumulator + (element.allInfos.price * element.quantity)),
      0);

    return (
      <>
        <Header
          numberItemsInCart={ numberItemsInCart }
        />

        <div className="shopping-cart-product-container">
          <div className="shopping-cart-product-card-container">
            <div className="shopping-cart-product-card-title">
              <p>Produtos</p>
            </div>
            {productsInCartArray.length ? (
              productsInCartArray.map((element) => (
                <div
                  className="shopping-cart-product-card"
                  key={ element.allInfos.id }
                >
                  <img
                    className="shopping-cart-product-img"
                    src={ element.allInfos.thumbnail }
                    alt={ element.allInfos.title }
                  />
                  <div className="shopping-cart-product-card-details">
                    <span className="shopping-cart-product-card-name">
                      { element.allInfos.title }
                    </span>
                    <button
                      type="button"
                      className="shopping-cart-product-remove-btn"
                      onClick={ () => this.setState({
                        productsInCartArray: storage.removeFromCart(element.allInfos),
                      }) }
                    >
                      Excluir
                    </button>
                    <div className="shopping-cart-product-quantity">
                      <button
                        type="button"
                        className="shopping-cart-product-quantity-btn"
                        disabled={ element.quantity <= 1 }
                        onClick={ () => this.setState({
                          productsInCartArray: storage.descreaseInCart(element.allInfos),
                        }) }
                      >
                        -
                      </button>
                      <span className="">
                        {`${element.quantity}` }
                      </span>
                      <button
                        type="button"
                        className="shopping-cart-product-quantity-btn"
                        disabled={ element.quantity
                          >= element.allInfos.available_quantity }
                        onClick={ () => this.setState({
                          productsInCartArray: storage.addToCart(element.allInfos),
                        }) }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <span className="shopping-cart-product-price">
                    { `Preço: R$ ${(element.allInfos.price * element.quantity)
                      .toFixed(2)}` }
                  </span>
                </div>
              ))
            ) : (
              <p className="shopping-cart-product-empty-message">
                Seu carrinho está vazio.
              </p>
            )}
          </div>
          <div className="to-checkout-container">
            <div className="to-checkout-resume-title">
              <p>Resumo da compra</p>
            </div>
            <div className="to-checkout-resume-container">
              <div className="to-checkout-resume-details">
                <span>{`Produtos (${totalQuantity})`}</span>
                <span>{`R$ ${totalPrice.toFixed(2)}`}</span>
              </div>
              <div className="to-checkout-resume-total">
                <span>Total: </span>
                <span>{`R$ ${totalPrice.toFixed(2)}`}</span>
                {/* <span>{totalPrice.toFixed(2)}</span> */}
              </div>
              {productsInCartArray.length ? (
                <Link to="/checkout" className="to-checkout-btn">Continuar a compra</Link>
              ) : ''}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ShoppingCart;
