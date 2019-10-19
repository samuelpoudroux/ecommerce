// Popup.js

import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Progress } from 'semantic-ui-react';
import { Button } from 'react-bootstrap'
import { form, input } from '../styles.js';
import './popup.css';
import axios from 'axios'


class Popup extends Component {

    constructor() {
        super();
        this.state = {
            sku: undefined,
            title: undefined,
            description: undefined,
            availableSizes: [],
            price: undefined,
            isFreeShipping: undefined,
            progressBar: 0,
            showPopup: false,
            size: undefined,
            showPopupConfirmation: false,
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.fileSelectHandler = this.fileSelectHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateProgessBar = this.updateProgessBar.bind(this);
        this.checkCompleted = this.checkCompleted.bind(this);
        this.addSize = this.addSize.bind(this);
        this.postProduct = this.postProduct.bind(this);
        this.renderSize = this.renderSize.bind(this);
        this.showPopupConfirmation = this.showPopupConfirmation.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    fileSelectHandler(e) {
        this.setState({
            image: e.target.files[0]
        })
    }

    showPopupConfirmation(){
        this.setState({
            showPopupConfirmation: true
        })
    }

    postProduct() {
        const p = new FormData()
        p.append('productImage', this.state.image, this.state.image.name)
        p.append('title', this.state.title)
        p.append('description', this.state.description)
        p.append('availableSizes', this.state.availableSize)
        p.append('price', this.state.price)
        axios.post('http://localhost:5000/product', p)
            .then(function (response) {
                if(response){
                    console.log(response)
                   this.showPopupConfirmation()
                };
            })
    }

    handleSubmit(e) {
        console.log('post')
        e.preventDefault();
        this.postProduct()
    }

    checkCompleted() {
        let done;
        var totalInputs = document.querySelectorAll('#input').length
        var filledInputs = 0;
        document.querySelectorAll('#input').forEach(input => {
            if (input.value !== "") {
                filledInputs++;
            }
        });
        // do the math
        var find = filledInputs / totalInputs * 100;
        // update local variable in Vue data
        done = Math.round(find);
        this.updateProgessBar(done);
    }

    updateProgessBar(done) {
        this.setState({ progressBar: done })
    }


    addSize(e) {
        var size = this.state.availableSizes
        size.push(this.state.size)
        this.setState({
            availableSize: size
        })

    }

    renderSize() {
        const size = this.state.availableSizes
        return size.map(i => {
            return <li>{i}</li>
        })
    }

    render() {
        const { errors } = this.state;
        return (
            <div className=" popup" style={{ marginTop: '50px', width: '100%' }}>
                <Progress percent={this.state.progressBar} attached='top' color='green' />

                <form onSubmit={this.handleSubmit} style={form} className='popup_inner'>
                    <h1>Créer votre produit</h1>
                    <div className="form-group" style={{ marginTop: '10px', width: '50%', display: 'flex', justifyContent: 'center' }}>
                        <input type="file"
                            id="avatar" name="image"
                            accept="image/png, image/jpeg"
                            onChange={this.fileSelectHandler}
                        />
                    </div>
                    <div className="form-group" style={{ marginTop: '10px', width: '50%', display: 'flex', justifyContent: 'center' }}>
                        <input style={input}
                            type="title"
                            placeholder="title"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.title
                            })}
                            id='input'
                            name="title"
                            onChange={this.handleInputChange}
                            onBlur={this.checkCompleted}

                            value={this.state.password}
                        />
                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    </div>
                    <div className="form-group" style={{ marginTop: '10px', width: '50%', display: 'flex', justifyContent: 'center' }}>
                        <input style={input}
                            type="description"
                            placeholder="description"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.description
                            })}
                            id='input'
                            name="description"
                            onChange={this.handleInputChange}
                            onBlur={this.checkCompleted}

                            value={this.state.password}
                        />
                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    </div>

                    <div className="form-group" style={{ marginTop: '10px', width: '50%', display: 'flex', justifyContent: 'center' }}>
                        <input style={input}
                            type="price"
                            placeholder="price"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.price
                            })}
                            id='input'
                            name="price"
                            onChange={this.handleInputChange}
                            onBlur={this.checkCompleted}

                            value={this.state.password}
                        />
                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    </div>

                    <div className="form-group" style={{ marginTop: '10px', width: '50%', display: 'flex', justifyContent: 'center' }}>
                        <input style={input}
                            type="size"
                            placeholder="size"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.size
                            })}
                            id='input'
                            name="size"
                            onChange={this.handleInputChange}
                            onBlur={this.checkCompleted}

                            value={this.state.password}
                        />

                        <Button variant="outline-primary" onClick={this.addSize}>+</Button>
                        <ul>
                            {this.renderSize()}
                        </ul>


                        {errors.password && (<div className="invalid-feedback">{errors.password}
                        </div>)}
                    </div>
                    <div className="form-group">
                        <Button variant="outline-primary" onClick={this.handleSubmit}>Créer</Button>

                    </div>
                </form>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, null)(Popup)