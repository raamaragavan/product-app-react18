import { combineReducers } from 'redux';

const initialState = {
  products: [],
  productDetails: {},
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS':
      return { ...state, products: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
    products: productReducer,
});

export default rootReducer;