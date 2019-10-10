// App.js
import React, { Component } from 'react';
import Products from './products/Product';
import Filter from '../Filter';
import Basket from '../Basket';


class ProductsPage extends Component {
  constructor() {
    super();
    this.state = { size: '', sort: '', cartItems: [], products: [], filteredProducts: [] };
  }
 

  handleRemoveFromCart = (e, product) => {
    this.setState(state => {
      const cartItems = state.cartItems.filter(a => a.id !== product.id);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { cartItems: cartItems };
    })
  }

  render() {
    return (
      <div className="container-fluid">
        <h1>Projet personnel</h1>
        <hr />
        <div className="row">
          <div className="col-md-9">
            <Filter /> 
            <hr />
            <Products/>
          </div>
          <div className="col-md-3">
            <Basket/>
          </div>

        </div>

      </div>
    );
  }
}

export default ProductsPage;