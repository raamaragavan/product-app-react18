import React from "react";
import { useDispatch, useSelector } from "react-redux";
import '../styles/cart.css';
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText, ListSubheader } from "@mui/material";
import { decrementQuantity, incrementQuantity, removeItem } from "../../redux/cart";
import { TiDelete } from "react-icons/ti";

function CartItems() {
    const cartItems = useSelector((state) => state.cart.items);
    const calculateTotal = () => {
        const totalAmount = cartItems.reduce((total, item) => total + item.initialPrice * item.quantity, 0);
        const formattedAmount = JSON.parse(JSON.stringify(totalAmount)).toFixed(2);
        return formattedAmount;
    };
    const dispatch = useDispatch();
    const handleIncrement = (product) => {
        dispatch(incrementQuantity(product));
    };

    const handleDecrement = (product) => {
        dispatch(decrementQuantity(product));
    };

    const handleRemoveFromCart = (cartId) => {
            dispatch(removeItem(cartId));
        };

    return (
        <div className="cart-detail">
            <List sx={{ width: '100%' }}>
                {cartItems && cartItems.length ? cartItems.map((cart) => (
                
                    <ListItem className="cart-list-item" alignItems="flex-start" key={cart.id}>
                        <ListItemAvatar sx={{ height: '100px', width: '100px' }}>
                            <Avatar sx={{ height: '80px', width: '80px' }} alt={cart.title} src={cart.thumbnail} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={cart.title}
                            secondary={
                                <React.Fragment>

                                    <p className="price">$ {cart.price} </p>
                                </React.Fragment>
                            }
        
                        />
                        <ListSubheader
                            children={
                                <React.Fragment>
                        
                        <TiDelete className="remove-cart" data-testid={`remove-cart-${cart.id}`} size={24} onClick={() => handleRemoveFromCart(cart.id)} />
                                </React.Fragment>
                            }
                        />
                        <div>
                            <IconButton data-testid={`reduce-quantity-cart-${cart.id}`} onClick={() => handleDecrement(cart)} aria-label="reduce quantity">
                                -
                            </IconButton>
                            <span>{cart.quantity}</span>
                            <IconButton data-testid={`add-quantity-cart-${cart.id}`} onClick={() => handleIncrement(cart)} aria-label="increase quantity">
                                +
                            </IconButton>
                        </div>
                    </ListItem>
                )) : <div className="cart-detail"><div className="no-data-msg">No Cart items added</div></div>}
            </List>
            {cartItems && cartItems.length ? (
                <p className="total-amount-section">Total - <span className="total-amount" data-testid="total-amount">$ {calculateTotal()}</span></p>
            ) : (
                ""
            )}

        </div>
    );
}

export default function CartList() {
    return (<CartItems />)
}