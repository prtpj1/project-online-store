import React, { Component } from 'react';
import * as api from '../services/api';

import Card from './Card';
import Header from './Header';
import { getSizeCart } from '../utils/cartIconFuncs';
import banner from '../images/banner-home.png';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCategories: [],
      query: '',
      products: [],
      selectedCategoryId: '',
      numberItemsInCart: getSizeCart(),
    };
  }

  async componentDidMount() {
    const allCategories = await api.getCategories();
    this.setState({ allCategories });
  }

  handleState = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleStateAndSearch = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.searchProduct);
  };

  searchProduct = async () => {
    const { query, selectedCategoryId } = this.state;
    const products = await api.getProductsFromCategoryAndQuery(selectedCategoryId, query);
    this.setState({ products: products.results });
  };

  updateSizeCartInState = (totalItems) => {
    this.setState({ numberItemsInCart: totalItems });
  };

  render() {
    const {
      state: { allCategories, query, products, numberItemsInCart },
      handleState,
      searchProduct,
      handleStateAndSearch,
    } = this;

    return (
      <>
        <Header
          query={ query }
          handleState={ handleState }
          searchProduct={ searchProduct }
          numberItemsInCart={ numberItemsInCart }
        />

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
                      name="selectedCategoryId"
                      value={ element.id }
                      id={ element.name }
                      onClick={ handleStateAndSearch }
                    >
                      {element.name}
                    </button>
                  </li>
                ))
              }
            </ul>
          </aside>

          <section className="products-display">
            <div className="products-container">
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
                        updateSizeCartInState={ this.updateSizeCartInState }
                      />
                    </li>
                  ))
                ) : (
                  <div>
                    <p>Nenhum produto foi encontrado</p>
                  </div>
                )
              }
            </div>

            <img
              alt="banner-home"
              className="banner-home"
              src={ banner }
            />
          </section>
        </main>
      </>
    );
  }
}

export default Home;
