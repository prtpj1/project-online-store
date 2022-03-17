import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineShoppingCart } from 'react-icons/hi';

import * as api from '../services/api';
import Card from './Card';

// library.add(fas, faTwitter, faFontAwesome);

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCategories: [],
      query: '',
      products: [],
      selectedCategoryId: '',
      numberItemsInCart: this.getSizeCart(),
    };
  }

  async componentDidMount() {
    const allCategories = await api.getCategories();
    this.setState({ allCategories });
  }

  getSizeCart = () => {
    const productsInCartString = localStorage.getItem('productsInCart');
    const productsInCart = (productsInCartString === null)
      ? [] : JSON.parse(productsInCartString);
    const totalItems = productsInCart.reduce((acc, curr) => curr.quantity + acc, 0);
    return totalItems;
  }

  updateSizeCartOInState = (totalItems) => {
    this.setState({ numberItemsInCart: totalItems });
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
      state: { allCategories, query, products, numberItemsInCart },
      handleState,
      searchProduct,
      handleStateAndSearch,
    } = this;

    return (
      <>
        <header>
          Frontend Online Store 23
          <Link to="/shopping-cart" data-testid="shopping-cart-button">
            <HiOutlineShoppingCart size={ 40 } />
          </Link>
          <p>
            Número de itens:
            {' '}
            <span data-testid="shopping-cart-size">{ numberItemsInCart }</span>
          </p>
        </header>
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
                      updateSizeCartOInState={ this.updateSizeCartOInState }
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
      </>
    );
  }
}

export default Home;
