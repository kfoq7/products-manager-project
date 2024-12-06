import { useQuery } from '@tanstack/react-query'
import { getAllProducts } from '@/service/product.service'

export function useListProduct() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['list-products'],
    queryFn: getAllProducts,
  })

  return {
    products: data,
    isLoadingProducts: isLoading,
    isErrorProducts: isError,
  }
}
