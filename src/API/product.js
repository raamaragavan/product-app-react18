export const fetchProductDetails = async (productId) => {
  const response = await fetch(
    `https://dummyjson.com/products/${productId}`,
  )
  return await response.json()
}
  