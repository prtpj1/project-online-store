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

  addToCart = (product) => {
    const productsInCartString = localStorage.getItem('productsInCart');
    const toAddInStorage = { allInfos: product, quantity: 1 };
    if (productsInCartString === null) {
      localStorage.setItem('productsInCart', JSON.stringify([toAddInStorage]));
    } else {
      const productsInCartObj = JSON.parse(productsInCartString);
      const indexSameId = productsInCartObj.findIndex((element) => element.allInfos.id === product.id);
      if (indexSameId === -1) {
        productsInCartObj.push(toAddInStorage);
      } else {
        productsInCartObj[indexSameId].quantity += 1;
      }
      localStorage.setItem('productsInCart', JSON.stringify(productsInCartObj));
    }
  }

  render() {
    const {
      state: { allCategories, query, products },
      handleState,
      searchProduct,
      handleStateAndSearch,
      addToCart: addingToCart,
    } = this;
    return (
      <div>
        <header>
          <section className="search">
            <input
              className="inpt-search"
              type="text"
              data-testid="query-input"
              name="query"
              value={ query }
              onChange={ handleState }
              size="100"
            />
            <button
              type="button"
              data-testid="query-button"
              onClick={ searchProduct }
            >
              Pesquisar
            </button>
          </section>
          <Link to="/shopping-cart" data-testid="shopping-cart-button">
            Carrinho de compras
          </Link>
        </header>
        <main className="main-container">
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

          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>

          <section className="products-display">
            {
              products ? (
                products.map((element) => (
                  <li key={ element.id } className="product-card">
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
