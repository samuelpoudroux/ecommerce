// App.js
import React, { Component } from 'react';
import Products from './products/Product';
import Filter from '../Filter';
import Basket from '../Basket';
import { connect } from 'react-redux'


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

  componentDidMount() {
    console.log(this.props.auth.isAuthenticated)
    if(!this.props.auth.isAuthenticated) {
        this.props.history.push('/');
    }

}
  login() {
    this.props.history.push('/login')
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
            <Products />
          </div>
          <div className="col-md-3">
            <Basket />
          </div>

        </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user
})

export default connect(mapStateToProps, null)(ProductsPage);