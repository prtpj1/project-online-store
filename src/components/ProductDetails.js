import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import * as api from '../services/api';
import * as storage from '../services/handleStorage';

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: '',
      title: '',
      thumbnail: '',
      attributes: [],
      price: '',
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const product = await api.getProductById(id);
    console.log(product);
    const { title, thumbnail, attributes, price } = product;
    this.setState({ title, thumbnail, attributes, price, product });
  }

  render() {
    const { title, thumbnail, attributes, price, product } = this.state;
    return (
      <div data-testid="product-detail-name">
        <Link to="/shopping-cart" data-testid="shopping-cart-button">
          Carrinho de compras
        </Link>
        <h3>{ title }</h3>
        <h3>{ price }</h3>
        <img src={ thumbnail } alt={ title } />
        <button
          data-testid="product-detail-add-to-cart"
          type="button"
          onClick={ () => storage.addToCart(product) }
        >
          Adicionar ao carrinho
        </button>
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
  addingToCart: propTypes.func,
  match: propTypes.shape({
    isExact: propTypes.bool,
    params: propTypes.objectOf(propTypes.string),
    path: propTypes.string,
    url: propTypes.string,
  }),
}.isRequired;

export default ProductDetails;
