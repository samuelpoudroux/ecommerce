import { FETCH_PRODUCTS, FILTER_PRODUCT_BY_SIZE, SORT_PRODUCT_BY_PRICE, ADD_TO_CART, REMOVE_FROM_CART } from "./types"

export const fetchProducts = () => (dispatch) => {
  fetch('http://localhost:5000/product').then(res => res.json())
    .then(data => {
      console.log(data)
      return dispatch({ type: FETCH_PRODUCTS, payload: data })
    });
}

export const filterProducts = (products, size) => (dispatch) => {
  return dispatch({
    type: FILTER_PRODUCT_BY_SIZE,
    payload: {
      size: size,
      items: size === '' ? products : products.filter(a => a.availableSizes.indexOf(size.toUpperCase()) >= 0),
      count: products.length
    }
  })
}


// becarefull we need to make a copy of the arrray items otherwhise redux is not able to findout when its change
export const sortProducts = (items, sort) => (dispatch) => {
  const products = items.slice()
  if (sort !== "") {
    products.sort((a, b) =>
      (sort === 'lowestprice'
        ? ((a.price > b.price) ? 1 : -1)
        : ((a.price < b.price) ? 1 : -1)));
    console.log(products)

  } else {
    products.sort((a, b) => (a.id > b.id) ? 1 : -1);
    console.log(products)

  }

  return dispatch({
    type: SORT_PRODUCT_BY_PRICE,
    payload: {
      sort: sort,
      items: products,
      count: products.length

    }
  })
}

