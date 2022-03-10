import React, { Component } from 'react';
import propTypes from 'prop-types';

class Card extends Component {
  render() {
    const { name, image, price } = this.props;
    return (
      <div data-testid="product">
        <h3>{ name }</h3>
        <img src={ image } alt={ name } />
        <h3>{ price }</h3>
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
