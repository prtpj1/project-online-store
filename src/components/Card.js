import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

class Card extends Component {
  render() {
    const { name, image, price, id, addingToCart, productToAdd } = this.props;
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
          onClick={ () => addingToCart(productToAdd) }
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
