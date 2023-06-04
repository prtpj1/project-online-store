import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { BsCart } from 'react-icons/bs';
import { IoIosSearch } from 'react-icons/io';

class Header extends Component {
  render() {
    const {
      query,
      handleState,
      searchProduct,
      numberItemsInCart,
    } = this.props;

    const searchIcon = <IoIosSearch size={ 20 } />;
    const shoppingCartIcon = <BsCart size={ 30 } />;

    const shoppingCartLink = (
      <Link to="/shopping-cart" data-testid="shopping-cart-button">
        {shoppingCartIcon}
      </Link>
    );

    const shoppingCartCounter = (
      <div className="shopping-cart-counter" data-testid="shopping-cart-size">
        {numberItemsInCart}
      </div>
    );

    return (
      <header className="header-bar">
        <section className="header-container">
          <Link to="/">
            <section className="header-title-logo">
              <img
                src="https://http2.mlstatic.com/frontend-assets/ui-navigation/5.18.9/mercadolibre/logo__small.png"
                alt="ml-logo"
                className="header-logo"
              />
              <div className="header-title">Online Store</div>
            </section>
          </Link>

          <section className="search">
            <input
              className="search-inpt"
              type="text"
              data-testid="query-input"
              name="query"
              value={ query }
              onChange={ handleState }
              size="100"
            />
            <button type="button" data-testid="query-button" onClick={ searchProduct }>
              {searchIcon}
            </button>
          </section>
          <section className="shopping-cart-container">
            <div className="shopping-cart-btn">
              {shoppingCartLink}
              {shoppingCartCounter}
            </div>
          </section>
        </section>
      </header>
    );
  }
}

Header.propTypes = {
  query: PropTypes.string.isRequired,
  handleState: PropTypes.func.isRequired,
  searchProduct: PropTypes.func.isRequired,
  numberItemsInCart: PropTypes.number.isRequired,
};

export default Header;
