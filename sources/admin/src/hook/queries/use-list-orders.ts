import { useQuery } from '@tanstack/react-query'
import { getAllOrders } from '@/service/order.service'

export function useListOrders() {
  const { data, isLoading } = useQuery({
    queryKey: ['list-order'],
    queryFn: getAllOrders,
  })

  return {
    orders: data ?? [],
    isLoadingOrders: isLoading,
  }
}
