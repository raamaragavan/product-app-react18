import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import '../styles/product-search.css';
import { useProducts } from '../query/fetch-product';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
function ProductListSearch() {
    const { data } = useProducts(0);
    const products = data?.products.map((product,index) => (
        {
          label: product.title,
          id: product.id + index
        } 
      ));
    console.log('products',products);

      // We can assume by this point that `isSuccess === true`
      return (
        <div className='product-search-wrapper'>
            <Autocomplete
      options={products}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.id}>
            {option.label}
          </li>
        );
      }}
      renderInput={(params) => <TextField {...params} label="" placeholder='Search products' />}
    />
        </div>
      );
    
  }

  export default function ProductSearch() {
    return (
    <QueryClientProvider client={queryClient}>
<ProductListSearch />
    </QueryClientProvider>
    

)
  }