import { useQuery } from '@tanstack/react-query'
import { getProductById } from '@/service/products.service'

export function useProductById(productId?: number | string | null) {
  console.log(productId)
  const { data } = useQuery({
    queryKey: ['product-id', productId],
    queryFn: () => getProductById(Number(productId)),
  })

  return {
    product: data,
  }
}
