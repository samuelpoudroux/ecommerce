// store.js

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';


const inititalState = {};
if (localStorage.getItem('cartItems')) {
        inititalState.cart = {items: JSON.parse(localStorage.getItem('cartItems'))};
      }
const composeEnhancer =window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
        rootReducer, 
        inititalState, 
        composeEnhancer(applyMiddleware(thunk), 
                ));


export default store;