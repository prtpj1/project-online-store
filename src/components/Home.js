import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import * as api from '../services/api';
import Card from './Card';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCategories: [],
      query: '',
      products: [],
      selectedCategoryId: '',
    };
  }

  async componentDidMount() {
    const allCategories = await api.getCategories();
    this.setState({ allCategories });
  }

  handleState = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleStateAndSearch = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.searchProduct);
  }

  searchProduct = async () => {
    const { query, selectedCategoryId } = this.state;
    const products = await api.getProductsFromCategoryAndQuery(selectedCategoryId, query);
    this.setState({ products: products.results });
  }

  render() {
    const {
      state: { allCategories, query, products },
      handleState,
      searchProduct,
      handleStateAndSearch,
      props: { addingToCart },
    } = this;
    return (
      <div>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Link to="/shopping-cart" data-testid="shopping-cart-button">
          Carrinho de compras
        </Link>
        <aside>
          <h1>Categorias</h1>
          <ul>
            {
              allCategories.map((element) => (

                <li key={ element.id }>
                  <button
                    type="button"
                    data-testid="category"
                    name="selectedCategoryId"
                    value={ element.id }
                    id={ element.name }
                    onClick={ handleStateAndSearch }
                  >
                    { element.name }
                  </button>
                </li>
              ))
            }
          </ul>
        </aside>
        <main>
          <section>
            <input
              type="text"
              data-testid="query-input"
              name="query"
              value={ query }
              onChange={ handleState }
            />
            <button
              type="button"
              data-testid="query-button"
              onClick={ searchProduct }
            >
              Pesquisar
            </button>
          </section>
          <section>
            {
              products ? (
                products.map((element) => (
                  <li key={ element.id }>
                    <Card
                      name={ element.title }
                      image={ element.thumbnail }
                      price={ element.price }
                      id={ element.id }
                      productToAdd={ element }
                      addingToCart={ addingToCart }
                    />
                  </li>
                ))
              ) : (
                <div>
                  <p>Nenhum produto foi encontrado</p>
                </div>
              )
            }
          </section>
        </main>
      </div>
    );
  }
}

Home.propTypes = {
  addingToCart: propTypes.func.isRequired,
};

export default Home;
