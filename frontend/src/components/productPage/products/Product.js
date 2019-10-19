import React, { Component } from 'react';
import util from '../../util';
import { connect } from 'react-redux';
import { addToCart} from '../../../actions/cartActions'
import {fetchProducts} from '../../../actions/productAction'


class Products extends Component {
    componentWillMount(){
        this.props.fetchProducts()
    }

    componentDidMount(){
        console.log(this.props.cartItems)
    }
    render() {
        const productItems = this.props.products.map(product => (
            <div className="col-md-4" key={product.id}>
                <div className="thumbnail text-center">
                    <a href={`#${product.id}`}onClick={()=>this.props.addToCart(this.props.cartItems, product)}>
                        <img src={`products/${product.image}`} alt={product.title} style={{height: '100px', width: '100px'}} />
                        <p>{product.title}</p>                        
                    </a>
                    {/* <b>{util.formatCurrency(product.price)}</b> */}
                    <button className="btn btn-primary"onClick={()=>this.props.addToCart(this.props.cartItems, product)}>Ajouter au panier</button>
                </div>
            </div>
        ));

        return (
            <div className="row">
                {productItems}
            </div>
        )
    }
}

const mapStateToProps = state =>({
    products: state.products.filteredItems,
    cartItems: state.cart.items
})
export default connect(mapStateToProps, { fetchProducts, addToCart})(Products)