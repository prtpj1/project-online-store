import React, { Component } from 'react';
import './App.css';
import * as api from './services/api';
// Alteração Paulo

class App extends Component {
  async componentDidMount() {
    await api.getCategories();
    await api.getProductsFromCategoryAndQuery();
  }

  render() {
    return (
      <div>
        <p>teste</p>
      </div>
    );
  }
}

export default App;
