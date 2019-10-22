import { connect } from 'react-redux';
import CheckoutForm from './checkoutForm';

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    totalPrice: state.cart.items.reduce((a, c) => (a + c.price * c.count), 0),
    cartItems: state.cart.items,
  };
};

const PaymentForm = connect(
  mapStateToProps
)(CheckoutForm);

export default PaymentForm;