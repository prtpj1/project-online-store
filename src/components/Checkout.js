import React, { Component } from 'react';
import Header from './Header';
import { getSizeCart } from '../utils/cartIconFuncs';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberItemsInCart: getSizeCart(),
    };
  }

  render() {
    const {
      state: { numberItemsInCart },
    } = this;
    return (
      <>
        <Header
          numberItemsInCart={ numberItemsInCart }
        />
        <form>
          <label htmlFor="checkout-fullname">
            Nome completo:
            {' '}
            <input id="checkout-fullname" type="text" />
          </label>
          <label htmlFor="checkout-email">
            Email:
            {' '}
            <input id="checkout-email" type="text" />
          </label>
          <label htmlFor="checkout-cpf">
            CPF:
            {' '}
            <input id="checkout-cpf" type="text" />
          </label>
          <label htmlFor="checkout-phone">
            Telefone:
            {' '}
            <input id="checkout-phone" type="text" />
          </label>
          <label htmlFor="checkout-cep">
            CEP:
            {' '}
            <input id="checkout-cep" type="text" />
          </label>
          <label htmlFor="checkout-address">
            Endereço:
            {' '}
            <textarea id="checkout-address" type="text" />
          </label>
          <button type="submit" onClick={ (event) => event.preventDefault() }>
            Pagamento
          </button>
        </form>
      </>
    );
  }
}

export default Checkout;
