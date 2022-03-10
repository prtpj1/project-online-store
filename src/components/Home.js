import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../services/api';
import Card from './Card';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCategories: [],
      query: '',
      products: [],
    };
  }

  async componentDidMount() {
    const allCategories = await api.getCategories();
    this.setState({ allCategories });
    await api.getProductsFromCategoryAndQuery();
  }

  handleState = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  searchProduct = async () => {
    const { query } = this.state;
    const products = await api.getProductsFromCategoryAndQuery(query);
    console.log(products);
    this.setState({ products: products.results });
  }

  render() {
    const {
      state: { allCategories, query, products },
      handleState,
      searchProduct,
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
                <li data-testid="category" key={ element.name }>{ element.name }</li>
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
                products.map(({ title, thumbnail, price }) => (
                  <li key={ title }>
                    <Card name={ title } image={ thumbnail } price={ price } />
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
