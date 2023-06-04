/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import * as api from '../services/api';
import * as storage from '../services/handleStorage';
import Header from './Header';

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    const { match: { params: { id } } } = this.props;
    const savedEvaluations = localStorage.getItem('evaluationInfos');
    const savedEvaluationsObj = (savedEvaluations === null) ? (
      [{ idProduct: '', evaluations: [{ email: '', rating: '', comments: '' }] }]
    ) : JSON.parse(savedEvaluations);

    this.state = {
      product: { shipping: { free_shipping: false } },
      title: '',
      thumbnail: '',
      attributes: [],
      price: '',
      email: '',
      rating: 5,
      comments: '',
      idProduct: id,
      evaluations: savedEvaluationsObj,
      numberItemsInCart: this.updateNumberItemsInCart(),
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const product = await api.getProductById(id);
    const { title, thumbnail, attributes, price } = product;
    this.setState({ title, thumbnail, attributes, price, product });
  }

  saveInLocalStorageAndState = (event) => {
    event.preventDefault();
    const { email, rating, comments, idProduct: id } = this.state;
    const indexDontExist = -1;
    const savedEvaluations = localStorage.getItem('evaluationInfos');

    if (!savedEvaluations) {
      const newEvaluations = [{
        idProduct: id, evaluations: [{ email, rating, comments }],
      }];
      localStorage.setItem('evaluationInfos', JSON.stringify(newEvaluations));
    } else {
      const savedEvaluationsObj = JSON.parse(savedEvaluations);
      const indexOfProduct = savedEvaluationsObj.findIndex((element) => (
        element.idProduct === id
      ));
      if (indexOfProduct !== indexDontExist) {
        savedEvaluationsObj[indexOfProduct].evaluations.push({ email, rating, comments });
      } else {
        savedEvaluationsObj.push({
          idProduct: id, evaluations: [{ email, rating, comments }],
        });
      }
      localStorage.setItem('evaluationInfos', JSON.stringify(savedEvaluationsObj));
    }
    this.setState({
      email: '',
      rating: 5,
      comments: '',
      evaluations: JSON.parse(localStorage.getItem('evaluationInfos')),
    });
  }

  handleState = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  updateNumberItemsInCart = () => {
    const productsInCartString = localStorage.getItem('productsInCart');
    const productsInCart = (productsInCartString === null)
      ? [] : JSON.parse(productsInCartString);
    const totalItems = productsInCart.reduce((acc, curr) => curr.quantity + acc, 0);
    return totalItems;
  }

  render() {
    const {
      title,
      thumbnail,
      attributes,
      price,
      product,
      email,
      rating,
      comments,
      idProduct: id,
      evaluations: savedEvaluationsObj,
      numberItemsInCart,
    } = this.state;
    const indexDontExist = -1;
    const maxRate = 5;
    const rateVector = Array(maxRate).fill(0);
    const indexOfProduct = savedEvaluationsObj.findIndex((element) => (
      element.idProduct === id
    ));
    return (
      <>
        <Header numberItemsInCart={ numberItemsInCart } />
        <main
          className="product-detail-main-container"
        >
          <h1>{ title }</h1>
          <span>
            {`R$${(+(price)).toFixed(2)}`}
          </span>
          <section className="product-detail-container">
            <img
              className="product-detail-img"
              src={ thumbnail }
              alt={ title }
            />
            <div className="product-detail-container-description">
              <button
                className="product-detail-shopping-cart-btn"
                type="button"
                onClick={ () => {
                  storage.addToCart(product);
                  this.setState({ numberItemsInCart: this.updateNumberItemsInCart() });
                } }
              >
                Comprar agora
              </button>
              {product.shipping.free_shipping && (
                <p
                  className="product-card-free-shipping"
                >
                  Frete grátis
                </p>
              )}
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
            <section className="product-detail-rating-container">
              <h2>Avaliar produto</h2>
              <form>
                <label htmlFor="product-detail-email">
                  Email:
                  <input
                    type="text"
                    id="product-detail-email"
                    name="email"
                    value={ email }
                    onChange={ this.handleState }
                  />
                </label>
                <br />
                {rateVector.map((_rate, index) => (
                  <label key={ `${index + 1}-rating` } htmlFor={ `${index + 1}-rating` }>
                    {index + 1}
                    <input
                      type="radio"
                      id={ `${index + 1}-rating` }
                      name="rating"
                      value={ index + 1 }
                      className={ index <= (rating) ? 'rate-btn on' : 'rate-btn off' }
                      checked={ index + 1 === parseInt(rating, 10) }
                      onChange={ this.handleState }
                    />
                  </label>
                ))}
                <br />
                <label htmlFor="product-detail-email">
                  Sua opinião sobre o produto:
                  <textarea
                    name="comments"
                    value={ comments }
                    onChange={ this.handleState }
                  />
                </label>
                <br />
                <button
                  className="product-detail-send-btn"
                  onClick={ this.saveInLocalStorageAndState }
                  type="submit"
                >
                  Enviar
                </button>
              </form>
            </section>
          </section>
        </main>
        {
          indexOfProduct !== indexDontExist && (
            <section className="product-detail-rates-container">
              <h2>Avaliações</h2>
              {
                savedEvaluationsObj[indexOfProduct].evaluations.map((element, index) => (
                  <section key={ `${index}-evaluations-subsection` }>
                    <ul>
                      <li>
                        Email:
                        <span>{ element.email }</span>
                      </li>
                      <li>
                        Nota:
                        <span>{ element.rating }</span>
                      </li>
                      <li>
                        Comentários:
                        <span>{ element.comments }</span>
                      </li>
                    </ul>
                  </section>
                ))
              }
            </section>
          )
        }
      </>
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
