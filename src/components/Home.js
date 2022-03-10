import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../services/api';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCategories: [],
    };
  }

  async componentDidMount() {
    const allCategories = await api.getCategories();
    this.setState({ allCategories });
    await api.getProductsFromCategoryAndQuery();
  }

  render() {
    const { allCategories } = this.state;
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
      </div>
    );
  }
}

export default Home;
