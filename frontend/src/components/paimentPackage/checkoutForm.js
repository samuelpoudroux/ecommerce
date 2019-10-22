import React, {Component} from 'react';
import {CardNumberElement, CardExpiryElement,injectStripe,CardCVCElement} from 'react-stripe-elements';
import Alert from '../alert';
import queryString from 'query-string';
import { instanceOf } from 'prop-types';
import axios from 'axios';


class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {msg:''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createOptions = this.createOptions.bind(this);

  }

  createOptions = () => {
    return {
      style: {
        base: {
          fontSize: '16px',
          color: '#blue',
          fontFamily: 'Open Sans, sans-serif',
          letterSpacing: '0.025em',
          '::placeholder': {
            color: '#aab7c4',
          },

        },
        invalid: {
          color: 'red',
        },
      }
    }
  };

  handleSubmit(ev) {
    ev.preventDefault();
    this.props.stripe.createToken({name: "samuel"})
      .then(result => {
        if(typeof(result.error) !== 'undefined') {
          this.setState({ error: result.error.message, success: ''});
        } else {
          this.stripeCreateCharge(result.token, this.props.totalPrice * 100, this.props.user.name + ' ' + this.props.user.id);
        }
      });
  }

  sendMail(mailBody){
    axios.post('http://localhost:5000/send-email', mailBody)
    .then(res => {
      console.log(res)
    }).catch(error => console.log(error))
  }

  mail(){
    return <p>aloup</p>
  }

  stripeCreateCharge(token, amount, userName) {
    const params = { token: token.id, amount: amount, info:userName};
    const qParams = queryString.stringify(params);
    const url = ['/charge', qParams].join('?');

    const mailBody={
      product: this.props.cartItems,
      clientName:this.props.user.name,
      clientId: this.props.user.id
    }
    

    fetch(url)
      .then(response => response.json())
      .then(val => {
        if (val.ok) {
          console.log(val)
          return val.message;
        } else {
          throw val.message;
        }
      })
      .then(success => {
        this.setState({alertMessage: success, alertStyle: 'success'})
        this.sendMail(mailBody)
      })
      .catch(error => this.setState({alertMessage: error, alertStyle: 'danger'}));
  }

  render() {
    console.log(this.props.cartItems)
    return (
        <form onSubmit={this.handleSubmit}>
              <Alert msg={this.state.alertMessage} style={this.state.alertStyle} />
        <div className="form-group">
          <label>Numéro de carte</label>
          <CardNumberElement { ...this.createOptions(  ) } />
        </div>
      
        <div className="form-group">
          <label>Date d'expiration</label>
          <CardExpiryElement { ...this.createOptions(  ) } />
        </div>
      
        <div className="form-group">
          <label>Code de sécurité</label>
          <CardCVCElement { ...this.createOptions() } />
        </div>

      
        <button type="submit" className="btn btn-primary">Payer!</button>
        <p>{this.props.totalPrice} €</p>

      </form>
    );
  }
}

export default injectStripe(CheckoutForm);
