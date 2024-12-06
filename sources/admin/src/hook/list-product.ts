import { getAllProducts } from '@/service/products'
import { Product } from '@/types/product'
import { useQuery } from '@tanstack/react-query'

export function useListProducts() {
  const { data, isLoading, isError } = useQuery<Product[]>({
    queryKey: ['list-products'],
    queryFn: getAllProducts,
  })

  return {
    products: data,
    isLodingProducts: isLoading,
    isErrorProducts: isError,
  }
}
