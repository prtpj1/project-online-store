import React, { Component } from 'react';
import propTypes from 'prop-types';

class ShoppingCart extends Component {
  render() {
    const { productsInCart } = this.props;
    return (
      <div>
        {productsInCart.length !== 0 ? (
          productsInCart.map((element) => (
            <div key={ element.title }>
              <h3 data-testid="shopping-cart-product-name">
                { element.title }
              </h3>
              <img src={ element.thumbnail } alt={ element.title } />
              <p data-testid="shopping-cart-product-quantity">Quantidade: 1</p>
              <p>
                Preço:
                {': '}
                { element.price }
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
