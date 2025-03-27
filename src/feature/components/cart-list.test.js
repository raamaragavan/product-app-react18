import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CartList from './cart-list';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import cartReducer from '../../redux/cart';
import { removeItem,decrementQuantity,incrementQuantity } from "../../redux/cart";
import store from '../../store';
let mockStore = configureMockStore();

describe('cart-list component', () => {
    let productSore;
    test('renders successfully', () => {
        productSore = mockStore({
            cart: {
                items: [],
            },
        });
        render(<Provider store={store}><CartList /></Provider>);
        const element = screen.getByText('No Cart items added');
        expect(element).toBeInTheDocument();
    });
    test('iterate cart items successfully', () => {
        // const store = createStore(cartReducer);
        productSore = mockStore({
            cart: {
                items: [{ id: 1, name: 'Product 1', initialPrice: 10, price: 10, quantity: 2 }],
            },
        });
        render(<Provider store={productSore}><CartList /></Provider>);
        expect(screen.getByTestId('total-amount')).toBeInTheDocument();
    });
    test('dispatches remove from cart action', () => {
        productSore = mockStore({
            cart: {
                items: [{ id: 1, name: 'Product 1', initialPrice: 10, price: 10, quantity: 2 }, { id: 2, name: 'Product 2', initialPrice: 20, price: 20, quantity: 2 }],
            },
        });
        render(<Provider store={productSore}><CartList /></Provider>);
        const removeButton = screen.getByTestId('remove-cart-1');
        fireEvent.click(removeButton);
        const initialState = {
            items: [{ id: 1, name: 'Product 1', initialPrice: 10, price: 10, quantity: 2 }, { id: 2, name: 'Product 2', initialPrice: 20, price: 20, quantity: 2 }],
        };
        const action = removeItem(1);
        const newState = cartReducer(initialState, action);
        expect(newState.items).toEqual([{ id: 2, name: 'Product 2', initialPrice: 20, price: 20, quantity: 2 }]);
    });
    test('increasing quantity of the selected cart', () => {
        productSore = mockStore({
            cart: {
                items: [{ id: 1, name: 'Product 1', initialPrice: 10, price: 20, quantity: 2 }, { id: 2, name: 'Product 2', initialPrice: 20, price: 40, quantity: 2 }],
            },
        });
        render(<Provider store={productSore}><CartList /></Provider>);
        const incrementButton = screen.getByTestId('add-quantity-cart-1');
        fireEvent.click(incrementButton);
        const initialState = {
            items: [{ id: 1, name: 'Product 1', initialPrice: 10, price: 20, quantity: 2 }, { id: 2, name: 'Product 2', initialPrice: 20, price: 40, quantity: 2 }],
        };
        const action = incrementQuantity(initialState.items[0]);
        const newState = cartReducer(initialState, action);
        expect(newState.items).toEqual([{ id: 1, name: 'Product 1', initialPrice: 10, price: 30, quantity: 3 }, { id: 2, name: 'Product 2', initialPrice: 20, price: 40, quantity: 2 }]);
    });
    test('decreasing quantity of the selected cart', () => {
        productSore = mockStore({
            cart: {
                items: [{ id: 1, name: 'Product 1', initialPrice: 10, price: 10, quantity: 2 }, { id: 2, name: 'Product 2', initialPrice: 20, price: 20, quantity: 2 }],
            },
        });
        render(<Provider store={productSore}><CartList /></Provider>);
        const decrementButton = screen.getByTestId('reduce-quantity-cart-2');
        fireEvent.click(decrementButton);
        const initialState = {
            items: [{ id: 1, name: 'Product 1', initialPrice: 10, price: 10, quantity: 2 }, { id: 2, name: 'Product 2', initialPrice: 20, price: 20, quantity: 2 }],
        };
        const action = decrementQuantity(initialState.items[1]);
        const newState = cartReducer(initialState, action);
        expect(newState.items).toEqual([{ id: 1, name: 'Product 1', initialPrice: 10, price: 10, quantity: 2 }, { id: 2, name: 'Product 2', initialPrice: 20, price: 20, quantity: 1 }]);
    });
});
