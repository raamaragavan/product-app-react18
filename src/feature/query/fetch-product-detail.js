
import { useQuery } from '@tanstack/react-query';
const fetchProductDetails = async (productId) => {
    const response = await fetch(
      `https://dummyjson.com/products/${productId}`,
    )
    if (!response.ok) {
      throw new Error(`API error in loading product detail for the productID' ${productId}`)
    }
    return await response.json()
  }


export const useProductDetails = (productId) => useQuery({
    queryKey: [`productDetail-${productId}`],
    queryFn: () => fetchProductDetails(productId),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })