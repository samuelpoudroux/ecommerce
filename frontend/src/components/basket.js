import React, { Component } from 'react';


export default class Basket extends Component {
    render() {
        const { products } = this.props;

        return (
            <div className="alert alert-info">
                {products.length === 0
                    ? "Basket is empty" :
                    <div>Vous avez {products.length} produits dans votre panier. <hr /></div>
                }
                {products.length > 0 &&
                    <div>
                        <ul style={{ marginLeft: -25 }}>
                            {products.map(item => (
                                <li key={item.id}>
                                    <b>{item.title}</b>
                                    <button style={{ float: 'right' }} className="btn btn-danger btn-xs"
                                        onClick={(e) => this.props.handleRemoveFromCart(e, item)}>X</button>
                                    <br />
                                </li>))
                            }
                        </ul>
                        <button onClick={() => alert('Todo: Implement checkout page.')} className="btn btn-primary">checkout</button>
                    </div>
                }
            </div>
        )
    }
