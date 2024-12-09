import { useQuery } from '@tanstack/react-query'
import { getAllProducts } from '@/service/products.service'
import { Product } from '@/types/product'

export function useListProducts() {
  const { data, isLoading, isError } = useQuery<Product[]>({
    queryKey: ['list-products'],
    queryFn: getAllProducts,
  })

  return {
    products: data ?? [],
    isLodingProducts: isLoading,
    isErrorProducts: isError,
  }
}
