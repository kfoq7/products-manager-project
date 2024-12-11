import { getOrderById } from '@/service/order.service'
import { useQuery } from '@tanstack/react-query'

export function useOrderById(orderId: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['order-id', orderId],
    queryFn: () => getOrderById(orderId),
  })

  return {
    order: data,
    isLoadingOrder: isLoading,
  }
}
