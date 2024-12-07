import { useQuery } from '@tanstack/react-query'
import { getAllPaymentMethod } from '@/service/payment.service'

export function useListPaymentMethods() {
  const { data, isLoading } = useQuery({
    queryKey: ['list-payment-method'],
    queryFn: getAllPaymentMethod,
  })

  return {
    paymentMethods: data,
    isLodingPaymentMethods: isLoading,
  }
}
