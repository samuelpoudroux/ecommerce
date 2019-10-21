import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import PaymentForm from './paiementForm';

class Payement extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_ghAvpU25OhVxsXzCeGxhJZpN00lOxHrvTL">
        <div className="example">
          <h1>React Stripe Elements Example</h1>
          <Elements>
            <PaymentForm/>
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default Payement;
