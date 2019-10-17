
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Redirect } from 'react-router'



class SmallBAsket extends Component {
    constructor() {
        super();
        this.state = {
            toProduct: false,
        };

        this.goProduct = this.goProduct.bind(this)
    }

    goProduct() {
        this.setState({
            toProduct: true
        })

    }


    render() {
        let { cartItems } = this.props;
        if (localStorage.getItem('cartItems')) {
            cartItems = JSON.parse(localStorage.getItem('cartItems'))
        };
        if (this.state.toProduct === true) {
            return (
                <Col>
                    <Redirect to='/product' />
                    <ShoppingBasketIcon style={{ color: 'white' }} onClick={this.goProduct} />
                    <b style={{ marginLeft: '3px', color: '#0A79FB' }}>{cartItems.length}</b>
                </Col>
            )
        }
       
        return (
            <Col>
                <ShoppingBasketIcon style={{ color: 'white' }} onClick={this.goProduct} />
                <b style={{ marginLeft: '3px', color: '#0A79FB' }}>{cartItems.length}</b>
            </Col>
        )
    }
}

const mapStateToProps = state => ({
    cartItems: state.cart.items,
})

export default connect(mapStateToProps, null)(SmallBAsket)