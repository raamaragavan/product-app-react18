import React, { useState, useEffect } from 'react';
import '../styles/product-list.css';
import { Link } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useProducts } from '../query/fetch-product';
import eventBus from "../../shared/event-bus";
import Grid from '@mui/material/Grid2';
import Button from '../library/Button';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem } from '../../redux/cart';


const queryClient = new QueryClient();

function ProductItems() {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const limitRange = 30;
    const [limit, setLimit] = useState(limitRange);
    const addActionProps = { className: 'add-cart-btn' };
    const removeActionProps = { className: 'remove-cart-btn' }
    const [selectedProduct, setSelectedProduct] = useState([]);
    const infiniteScroll = () => {
        const productContainer = document.getElementById('products-container');
        // End of the document reached?
        if (productContainer.offsetHeight + productContainer.scrollTop >= productContainer.scrollHeight && (!selectedProduct.length)) {
            const totalProducts = data.total;
            if (limit <= totalProducts + limitRange) {
                setLimit((old) => old + limitRange);
                localStorage.setItem('productPageLimit', limit);
            } else {
                console.log('maximum limit reached');
            }
        }
    }


    const { data, status, error, isFetching } = useProducts(limit);
    const [products, setProducts] = useState([]);

    const handleAddToCart = (product) => {
        dispatch(addItem(product));
    };

    const handleRemoveFromCart = (productId) => {
        dispatch(removeItem(productId));
    };

    useEffect(() => {
        if (data) {
            // Process the data and update the state
            setProducts(data?.products);
            eventBus.dispatch("loadProducts", { products: data?.products });
            eventBus.on("productSelected", (selectedData) => {
                const selectedProductCategory = selectedData.selectedProduct || [];
                setSelectedProduct(selectedData.selectedProduct)
                if (selectedProductCategory && selectedProductCategory.length) {

                    const filteredProducts = [];
                    data?.products.forEach((product) => {
                        if (selectedProductCategory.find((category) => category.name === product.category)) {
                            filteredProducts.push(product);
                        }
                    })
                    setProducts(filteredProducts);
                } else {
                    setProducts(data.products);
                }
            });
            return () => {
                eventBus.remove("productSelected");
            };
        }
    }, [data]);// eslint-disable-line react-hooks/exhaustive-deps

    if (status === 'pending') {
        return <div className='products-container'><div className="loading-section"><div className="loader"></div></div></div>
    }

    if (status === 'error') {
        return <div className='products-container'><span>Error: {error.message}</span></div>
    }

    if (status === 'success') {
        // We can assume by this point that `isSuccess === true;
        const getStockName = (availabilityStatus) => {
            let color = 'black';
            if (availabilityStatus === "Low Stock") {
                color = 'orange';
            } else if (availabilityStatus === "In Stock") {
                color = 'green';
            } else {
                color = 'red';
            }

            return color;
        };

        const isInCart = (productId) => cartItems.some((cart) => cart.id === productId);

        const maxRating = 5;

        return (
            <Grid container className='products-item-list' spacing={2} onScroll={infiniteScroll} id="products-container">
                {products && products.length ? products.map((product) => (
                    <Grid key={product.id} size={{ xs: 12, sm: 3, md: 3 }} >
                        <div className='product-item'>
                            <h2>{product.title}</h2>
                            <div className='product-image-background' style={{ backgroundImage: `url(${product.thumbnail})` }}>
                            </div>

                            <p className="price">$ {product.price}</p>
                            <span className={`availability-status ${getStockName(product.availabilityStatus)}`}>{product.availabilityStatus}</span>
                            <Link to={`/details/${product.id}`}>View details</Link>
                            <div>
                                {isInCart(product.id) ? (
                                    <Button {...removeActionProps} onClick={() => handleRemoveFromCart(product.id)}>Remove from cart</Button>
                                ) : (
                                    <Button {...addActionProps} onClick={() => handleAddToCart(product)}>Add to cart</Button>
                                )}



                            </div>
                            <div>
                                <p>Rating: {product.rating} / {maxRating}</p>
                            </div>
                        </div>
                    </Grid>
                )) : 'No products found'}
                {isFetching ? <div className="loading-section"><div className="loader"></div></div> : null}
            </Grid>
        );
    }
}

export default function ProductList() {
    return (
        <QueryClientProvider client={queryClient}>
            <ProductItems />
        </QueryClientProvider>
    )
}