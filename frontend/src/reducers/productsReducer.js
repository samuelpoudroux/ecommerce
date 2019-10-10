import { FETCH_PRODUCTS, FILTER_PRODUCT_BY_SIZE, SORT_PRODUCT_BY_PRICE, ADD_TO_CART, REMOVE_FROM_CART} from "../actions/types";


const initialState = { items : [], filteredItems: [], size : '', sort: '', cartItems: []};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_PRODUCTS:
        return { ...state, items: action.payload,  filteredItems:action.payload};
        case FILTER_PRODUCT_BY_SIZE:
        return { ...state, filteredItems: action.payload.items, size: action.payload.size, count: action.payload.count };
        case SORT_PRODUCT_BY_PRICE:
        return { ...state, filteredItems: action.payload.items, sort: action.payload.sort, count:action.payload.count };
        default: 
            return state;
    }

}