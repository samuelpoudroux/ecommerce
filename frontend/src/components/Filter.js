
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterProducts, sortProducts } from '../actions/productAction'
import AddButton from '@material-ui/icons/AddCircleOutline';
import Can from './can'
import Popup from './productPage/popupCreation'

class Filter extends Component {
    constructor() {
        super();
        this.state = { showPopup: false };

        this.showPopup = this.showPopup.bind(this)
    }

    showPopup() {
        this.setState({
            showPopup: true
        })
    }
    render() {

        return (
            <div className="row">
                        { this.state.showPopup ? <Popup /> : null}
                <div className="col-md-4">
                    {`${this.props.A.length} products found.`}
                </div>
                <div className="col-md-4">
                    <label>Trier par
               <select className="form-control" value={this.props.sort} onChange={(e) => this.props.sortProducts(this.props.A, e.target.value)}>
                            <option value="">Select</option>
                            <option value="lowestprice">Lowest to highest</option>
                            <option value="highestprice">Highest to lowest</option>
                        </select>
                    </label>
                </div>
                <div className="col-md-3">
                    <label > Filtrer par taille
               <select className="form-control" value={this.props.size} onChange={(e) => this.props.filterProducts(this.props.products, e.target.value)}>
                            <option value="">ALL</option>
                            <option value="x">XS</option>
                            <option value="s">S</option>
                            <option value="m">M</option>
                            <option value="l">L</option>
                            <option value="xl">XL</option>
                            <option value="xxl">XXL</option>
                        </select>
                    </label>

                </div>
                <Can className='col-md-1'>
                    <AddButton onClick={this.showPopup} />
                </Can>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    products: state.products.items,
    size: state.products.size,
    sort: state.products.sort,
    A: state.products.filteredItems
})

export default connect(mapStateToProps, { filterProducts, sortProducts })(Filter)