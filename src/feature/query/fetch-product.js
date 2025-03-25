
import { useQuery,keepPreviousData } from '@tanstack/react-query';
const fetchProducts = async (limit) => {
    const response = await fetch(
      `https://dummyjson.com/products?limit=${limit}`
    );
    if (!response.ok) {
      throw new Error('API error in loading products')
    }
    return await response.json()
  };


export const useProducts = (limit) => useQuery({
    queryKey: ['products', limit],
    queryFn: () => fetchProducts(limit),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  })