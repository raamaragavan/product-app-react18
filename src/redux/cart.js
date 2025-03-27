import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: []
  },
  reducers: {
    addItem: (state, action) => {
      const itemExists = state.items.find((item) => item.id === action.payload.id);
      const initialPrice = JSON.parse(JSON.stringify(action.payload.price));
      if (itemExists) {
        itemExists.quantity++;
      } else {
        state.items.push({ ...action.payload, quantity: 1,initialPrice:initialPrice });
      }
    },
    incrementQuantity: (state, action) => {
      const itemExists = state.items.find((item) => item.id === action.payload.id);
      if (itemExists && itemExists.quantity >= 1) {
       
        itemExists.quantity++;
        itemExists.price = itemExists.initialPrice * itemExists.quantity;
      }
    },
    decrementQuantity: (state, action) => {
      const itemExists = state.items.find((item) => item.id === action.payload.id);
      if (itemExists && itemExists.quantity > 1) {
        itemExists.quantity--;
        itemExists.price = itemExists.initialPrice * itemExists.quantity;
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    
  },
});

export const { addItem, incrementQuantity,decrementQuantity,removeItem } = cartSlice.actions;
export default cartSlice.reducer;