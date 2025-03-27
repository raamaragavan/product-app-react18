import React from 'react';
import '../styles/home.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import ProductList from './product-list';
import ProductFilter from './product-filter';


export default function Home() {
  return (
    <Box className="products-container" sx={{ flexGrow: 1 }}>
        <Grid container className='products-grid'  spacing={2}>
        <Grid className='products-filter-section' size={{ xs: 12, sm: 2, md: 2 }} >
        <ProductFilter />
        </Grid>
        <Grid className='products-list-section' size={{ xs: 12, sm: 10, md: 10 }} >
          <ProductList />
        </Grid>
        </Grid>
      </Box>
  )
}
