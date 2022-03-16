import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import * as api from '../services/api';
import * as storage from '../services/handleStorage';

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    const { match: { params: { id } } } = this.props;
    const savedEvaluations = localStorage.getItem('evaluationInfos');
    const savedEvaluationsObj = (savedEvaluations === null) ? (
      [{ idProduct: '', evaluations: [{ email: '', rating: '', comments: '' }] }]
    ) : JSON.parse(savedEvaluations);

    this.state = {
      product: '',
      title: '',
      thumbnail: '',
      attributes: [],
      price: '',
      email: '',
      rating: 5,
      comments: '',
      idProduct: id,
      evaluations: savedEvaluationsObj,
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
    } = this.state;
    const indexDontExist = -1;
    const { history } = this.props;
    const maxRate = 5;
    const rateVector = Array(maxRate).fill(0);
    const indexOfProduct = savedEvaluationsObj.findIndex((element) => (
      element.idProduct === id
    ));
    return (
      <>
        <div data-testid="product-detail-name">
          <Link to="/shopping-cart" data-testid="shopping-cart-button">
            Carrinho de compras
          </Link>
          <button type="button" onClick={ () => history.goBack() }>
            Voltar
          </button>
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
        <h2>Avaliar produto</h2>
        <form>
          <label htmlFor="product-detail-email">
            Email:
            <input
              type="text"
              data-testid="product-detail-email"
              id="product-detail-email"
              name="email"
              value={ email }
              onChange={ this.handleState }
            />
          </label>
          {rateVector.map((_rate, index) => (
            <label key="index" htmlFor={ `${index + 1}-rating` }>
              {index + 1}
              <input
                type="radio"
                id={ `${index + 1}-rating` }
                name="rating"
                key={ `${index + 1}-rating` }
                value={ index + 1 }
                checked={ index + 1 === rating }
                data-testid={ `${index + 1}-rating` }
                onChange={ this.handleState }
              />
            </label>
          ))}
          <textarea
            data-testid="product-detail-evaluation"
            name="comments"
            value={ comments }
            onChange={ this.handleState }
          />
          <button
            type="submit"
            onClick={ this.saveInLocalStorageAndState }
            data-testid="submit-review-btn"
          >
            Enviar
          </button>
        </form>

        {
          indexOfProduct !== indexDontExist && (
            <section>
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
