import React, { Component } from 'react';

class Checkout extends Component {
  render() {
    return (
      <form>
        <label htmlFor="checkout-fullname">
          Nome completo:
          {' '}
          <input id="checkout-fullname" data-testid="checkout-fullname" type="text" />
        </label>
        <label htmlFor="checkout-email">
          Email:
          {' '}
          <input id="checkout-email" data-testid="checkout-email" type="text" />
        </label>
        <label htmlFor="checkout-cpf">
          CPF:
          {' '}
          <input id="checkout-cpf" data-testid="checkout-cpf" type="text" />
        </label>
        <label htmlFor="checkout-phone">
          Telefone:
          {' '}
          <input id="checkout-phone" data-testid="checkout-phone" type="text" />
        </label>
        <label htmlFor="checkout-cep">
          CEP:
          {' '}
          <input id="checkout-cep" data-testid="checkout-cep" type="text" />
        </label>
        <label htmlFor="checkout-address">
          CEP:
          {' '}
          <input id="checkout-address" data-testid="checkout-address" type="text" />
        </label>
        <button type="submit" onClick={ (event) => event.preventDefault() }>
          Pagamento
        </button>
      </form>
    );
  }
}

export default Checkout;
