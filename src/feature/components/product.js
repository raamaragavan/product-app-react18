import React, { useState } from 'react';
import '../styles/product.css';
import { Link } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useProducts } from '../query/fetch-product';

const queryClient = new QueryClient();

function ProductList() {
  const limitRange = 30;
  const [limit, setLimit] = useState(limitRange);
  const infiniteScroll = () => {
    const productGrid = document.getElementById('products-grid');
     // End of the document reached?
    if (productGrid.offsetHeight + productGrid.scrollTop >= productGrid.scrollHeight) {
      const totalProducts = data.total;
      if(limit <= totalProducts + limitRange) {
        setLimit((old) => old + limitRange);
        localStorage.setItem('productPageLimit', limit);
      } else{
        console.log('maximum limit reached');
      }
     
       }
    }
  //   const useProducts = () =>  useQuery({
  //   queryKey: ['products', limit],
  //   queryFn: () => fetchProducts(limit),
  //   refetchOnWindowFocus: false,
  //   placeholderData: keepPreviousData,
  // })

  const { data, status, error,isFetching } = useProducts(limit);

  if (status === 'pending') {
    return <div className='products-grid'><div className="loading-section"><div className="loader"></div></div></div>
  }

  if (status === 'error') {
    return <div className='products-grid'><span>Error: {error.message}</span></div>
  }

  if (status === 'success') {
    // We can assume by this point that `isSuccess === true;
    const products = data?.products;

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

    const maxRating = 5;

    return (
      <div className='products-grid' onScroll={infiniteScroll} id="products-grid">
        {products && products.length ? products.map((product) => (
          
          <div className='product-item' key={product.id}>
            <h2>{product.title}</h2>
            <div className='product-image-background' style={{ backgroundImage: `url(${product.thumbnail})` }}>
            </div>

            <p className="price">$ {product.price}</p>
            <span className={`availability-status ${getStockName(product.availabilityStatus)}`}>{product.availabilityStatus}</span>
            <Link to={`/details/${product.id}`}>View details</Link>
            <div>
              <p>Rating: {product.rating} / {maxRating}</p>
            </div>
          </div>
        )) : 'No products found'}
        {isFetching ? <div className="loading-section"><div className="loader"></div></div> : null}
      </div>
    );
  }
}

export default function Products() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductList />
    </QueryClientProvider>
  )
}
