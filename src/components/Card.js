import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

class Card extends Component {
  render() {
    const { name, image, price, id } = this.props;
    return (
      <Link data-testid="product-detail-link" to={ `/product/${id}` }>
        <div data-testid="product">
          <h3>{ name }</h3>
          <img src={ image } alt={ name } />
          <h3>{ price }</h3>
        </div>
      </Link>
    );
  }
}

Card.propTypes = {
  name: propTypes.string,
  image: propTypes.string,
  price: propTypes.string,
}.isRequired;

export default Card;
