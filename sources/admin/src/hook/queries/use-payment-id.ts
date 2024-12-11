import { getPaymentById } from '@/service/payment.service'
import { useQuery } from '@tanstack/react-query'

export function usePaymentById(paymentId: string) {
  console.log(paymentId)

  const { data, isLoading } = useQuery({
    queryKey: ['payment-id', paymentId],
    queryFn: () => getPaymentById(Number(paymentId)),
  })

  return {
    payment: data,
    isLoadingPayment: isLoading,
  }
}
