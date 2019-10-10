import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import productReducer from './productsReducer';
import cartReducers from './cartReducers'

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    products:productReducer,
    cart:cartReducers
});