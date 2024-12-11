import { useQuery } from '@tanstack/react-query'
import { getAllPayment } from '@/service/payment.service'

export function useListPayment() {
  const { data, isLoading } = useQuery({
    queryKey: ['list-payment'],
    queryFn: getAllPayment,
  })

  return {
    payments: data ?? [],
    isLoadingPayments: isLoading,
  }
}
