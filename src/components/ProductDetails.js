import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import * as api from '../services/api';

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      thumbnail: '',
      attributes: [],
      price: '',
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const { title, thumbnail, attributes, price } = await api.getProductById(id);
    this.setState({ title, thumbnail, attributes, price });
  }

  render() {
    const { title, thumbnail, attributes, price } = this.state;
    return (
      <div data-testid="product-detail-name">
        <Link to="/shopping-cart" data-testid="shopping-cart-button">
          Carrinho de compras
        </Link>
        <h3>{ title }</h3>
        <h3>{ price }</h3>
        <img src={ thumbnail } alt={ title } />
        <ul>
          {
            attributes.map((element) => (
              <li key={ element.name }>
                { element.name }
                {': '}
                { element.value_name }
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: propTypes.shape({
    isExact: propTypes.bool,
    params: propTypes.objectOf(propTypes.string),
    path: propTypes.string,
    url: propTypes.string,
  }).isRequired,
};

export default ProductDetails;
