

export const fetchProducts = () => async (dispatch) => {
    const response = await fetch('https://dummyjson.com/products');
    console.log('response',response);
    const data = await response.json();
    const productData = data?.products || [];
    console.log('productData',productData)
    dispatch({ type: 'FETCH_PRODUCTS', payload: productData });
  };