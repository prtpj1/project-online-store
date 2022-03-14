import React, { Component } from 'react';
import * as storage from '../services/handleStorage';

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    const productsInCartString = localStorage.getItem('productsInCart');
    const productsInCartArray = JSON.parse(productsInCartString);
    this.state = {
      productsInCartArray,
    }
  }

  render() {
    const { productsInCartArray } = this.state;
    return (
      <div>
        {productsInCartArray.length !== 0 ? (
          productsInCartArray.map((element) => (
            <div key={ element.allInfos.id }>
              <h3 data-testid="shopping-cart-product-name">
                { element.allInfos.title }
              </h3>
              <img src={ element.allInfos.thumbnail } alt={ element.allInfos.title } />
              <p data-testid="shopping-cart-product-quantity">Quantidade: { element.quantity }</p>
              <p>
                Preço
                {': '}
                { (element.allInfos.price * element.quantity).toFixed(2) }
              </p>
              <button
                data-testid="product-increase-quantity"
                onClick={() => this.setState({ productsInCartArray: storage.addToCart(element.allInfos) })  }
              >
                Mais um
              </button>
              <button
                data-testid="product-decrease-quantity"
                onClick={ () => this.setState({ productsInCartArray: storage.descreaseInCart(element.allInfos) })  }
              >
                Menos um
              </button>
            </div>
          ))
        ) : (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio.
          </p>
        )}
      </div>
    );
  }
}

export default ShoppingCart;
