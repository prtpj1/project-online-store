import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import * as storage from '../services/handleStorage';

class Card extends Component {
  getSizeCart = () => {
    const productsInCartString = localStorage.getItem('productsInCart');
    const productsInCart = (productsInCartString === null)
      ? [] : JSON.parse(productsInCartString);
    const totalItems = productsInCart.reduce((acc, curr) => curr.quantity + acc, 0);
    return totalItems;
  }

  render() {
    const { name, image, price, id, productToAdd, updateSizeCartOInState } = this.props;
    return (
      <div data-testid="product">
        <Link data-testid="product-detail-link" to={ `/product/${id}` }>
          <h3>{ name }</h3>
          <img src={ image } alt={ name } />
          <h3>{ price }</h3>
        </Link>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ () => {
            storage.addToCart(productToAdd);
            updateSizeCartOInState(this.getSizeCart());
          } }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

Card.propTypes = {
  name: propTypes.string,
  image: propTypes.string,
  price: propTypes.string,
}.isRequired;

export default Card;
