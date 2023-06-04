import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import * as storage from '../services/handleStorage';

import { getSizeCart } from '../utils/cartIconFuncs';

class Card extends Component {
  render() {
    const { name, image, price, id, productToAdd, updateSizeCartInState } = this.props;
    return (
      <div className="product-card">
        <Link
          className="product-card-link"
          to={ `/product/${id}` }
        >
          <div className="product-card-link-img">
            <div className="product-img">
              <img src={ image } alt={ name } />
            </div>
          </div>
          <div className="product-card-link-text">
            <h2 className="product-card-title">{ name }</h2>
            <h3 className="product-card-price">{ `R$ ${price.toFixed(2)}` }</h3>
            {productToAdd.shipping.free_shipping && (
              <p
                className="product-card-free-shipping"
              >
                Frete grátis
              </p>
            ) }
          </div>
        </Link>
        <button
          className="add-to-cart-btn"
          type="button"
          onClick={ () => {
            storage.addToCart(productToAdd);
            updateSizeCartInState(getSizeCart());
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
