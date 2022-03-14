import React, { Component } from 'react';
import propTypes from 'prop-types';

class ShoppingCart extends Component {
  render() {
    const productsInCartString = localStorage.getItem('productsInCart');
    const productsInCartArray = JSON.parse(productsInCartString);
    return (
      <div>
        {productsInCartArray.length !== 0 ? (
          productsInCartArray.map((element) => (
            <div key={ element.allInfos.id }>
              <h3 data-testid="shopping-cart-product-name">
                { element.allInfos.title }
              </h3>
              <img src={ element.allInfos.thumbnail } alt={ element.allInfos.title } />
              <p data-testid="shopping-cart-product-quantity">Quantidade: { element.quantity }</p>
              <p>
                Preço
                {': '}
                { element.allInfos.price * element.quantity }
              </p>
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

ShoppingCart.propTypes = {
  productsInCart: propTypes.arrayOf(
    propTypes.objectOf(propTypes.any),
  ).isRequired,
};

export default ShoppingCart;
