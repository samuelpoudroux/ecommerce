
import React, { Component } from 'react';
import util from './util';
import { connect } from 'react-redux';
import {removeFromCart} from '../actions/cartActions'


class Basket extends Component {
    render() {
        let { cartItems } = this.props;
        if (localStorage.getItem('cartItems')) {
            cartItems= JSON.parse(localStorage.getItem('cartItems')) 
        };
        return (
            <div className="alert alert-info">
                {cartItems.length === 0
                    ? "Basket is empty" :
                    <div>Vous avez {cartItems.length} 
                    produits dans votre panier. <hr /></div>
                }
                {cartItems.length > 0 &&
                    <div>
                        <ul style={{ marginLeft: -25 }}>
                            {cartItems.map(item => (
                                <li key={item.id}>.
                                    <b>{item.title}</b>
                                    <button style={{ float: 'right' }} className="btn btn-danger btn-xs"
                                        onClick={() => this.props.removeFromCart(this.props.cartItems, item)}>X</button>
                                    <br />
                                    {item.count} X {util.formatCurrency(item.price)}
                                </li>))
                            }
                        </ul>

                        <b>Sum: {util.formatCurrency(cartItems.reduce((a, c) => (a + c.price * c.count), 0 ))}
                        </b>
                        <button onClick={() => alert('Todo: Implement checkout page.')} className="btn btn-primary">checkout</button>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
 cartItems: state.cart.items,
})

export default connect(mapStateToProps, {removeFromCart}) (Basket)