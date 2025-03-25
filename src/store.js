import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './redux/cart';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;