import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import * as storage from '../services/handleStorage';

import { MdOutlineAddShoppingCart } from 'react-icons/md';

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
      <div data-testid="product" className="product-card">
        <Link data-testid="product-detail-link" to={ `/product/${id}` }>
          <div className="product-card-link">
            <div className="product-img">
              <img src={ image } alt={ name } />
            </div>
            <div>
              <h2 className="product-card-title">{ name }</h2>
              <h3 className="product-card-price">{ `R$ ${price.toFixed(2)}` }</h3>
            </div>
          </div>
        </Link>
        <button
          className="add-to-cart"
          type="button"
          data-testid="product-add-to-cart"
          onClick={ () => {
            storage.addToCart(productToAdd);
            updateSizeCartOInState(this.getSizeCart());
          } }
        >
          <MdOutlineAddShoppingCart size={ 30 } />
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
