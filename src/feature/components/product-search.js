import React, { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import '../styles/product-search.css';
import eventBus from "../../shared/event-bus";


function ProductListSearch() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    eventBus.on("loadProducts", (data) => {
      if (!data) return;
      if (data && data?.products && data?.products?.length) {
        const loadedProducts = data?.products;
        const uniqueCategories = loadedProducts.map(product => product.category).filter((value, index, self) => self.indexOf(value) === index)
        const finalCategories = [];
        uniqueCategories.forEach((item, index) => {
          const newItem = {
            "name": item,
            "checked": false,
            "id": index
          }
          finalCategories.push(newItem);
        });

        setCategories(finalCategories);
      }
    });

    return () => {
      eventBus.remove("loadProducts");
    };
    // We can assume by this point that `isSuccess === true;

  }, []);

  function toTitleCase(str) {
    if (!str) {
      return "";
    }
    return str.toLowerCase().split(' ').map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  }

  const handleChange = (event,category) => {
  
    const checked = event?.target.checked
    const currentCategory = category;
    currentCategory.checked = checked;
    categories.forEach((category) => {
      if(category.id === currentCategory.id){
        category.checked = currentCategory.checked;
      }
    })
   
    let selectedCategories = [];
    categories.forEach((category) => {
      if(category.checked){
        selectedCategories.push(category)
      }
    })
    eventBus.dispatch("productSelected", { selectedProduct: selectedCategories });
  };

  // We can assume by this point that `isSuccess === true`
  return (
    <div className='product-filter-wrapper'>
      <h4>Filter by Category</h4>
      <div className='filter-inner-wrapper'>
      <FormControl sx={{ m: 1, width: '100%' }}>
        {categories.map((category) => (
          <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox onChange={(event) => handleChange(event, category)} name={category.name} />
              }
              label={toTitleCase(category.name)}
            />
          </FormGroup>
        </FormControl>
        ))}
      </FormControl>
      </div>
    </div>
  );

}

export default function ProductSearch() {
  return (<ProductListSearch />)
}