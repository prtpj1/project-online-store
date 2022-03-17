import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineShoppingCart } from 'react-icons/hi';

import * as api from '../services/api';
import Card from './Card';
import * as storage from '../services/handleStorage';

// library.add(fas, faTwitter, faFontAwesome);

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
            <HiOutlineShoppingCart size={ 40 } />
          </Link>
        </header>
        <main className="main-container">
          <aside>
            <h1 className="category-h1">Categorias</h1>
            <ul>
              {
                allCategories.map((element) => (

                  <li key={ element.id }>
                    <button
                      type="button"
                      className="category-btn"
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
                  <li key={ element.id } className="product">
                    <Card
                      name={ element.title }
                      image={ element.thumbnail }
                      price={ element.price }
                      id={ element.id }
                      productToAdd={ element }
                      addingToCart={ storage.addToCart }
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

export default Home;
