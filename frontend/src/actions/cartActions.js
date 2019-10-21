import {  ADD_TO_CART, REMOVE_FROM_CART } from "./types"


export const addToCart = (items, product) => (dispatch) => {
  console.log(product)
    const cartItems = items.slice()
    let productAlreadyInCart = false;
  
    cartItems.forEach(cp => {
      console.log(cp.id+ ' ' + product.id)
      if (cp._id === product._id) {
        cp.count += 1;
        productAlreadyInCart = true;
      }
    });
  
    if (!productAlreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  
    return dispatch({
      type: ADD_TO_CART,
      payload: {
        cartItems: cartItems,
      }
    })
  }
  
  export const removeFromCart = (items, product) => (dispatch) => {
    console.log(items)
    const cartItems = items.slice().filter(a => a._id !== product._id);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

    return dispatch({
      type: REMOVE_FROM_CART,
      payload: {
        cartItems: cartItems,
      }
    })
  }