import { useMutation } from '@tanstack/react-query'
import { createPayment } from '@/service/payment.service'

export function usePaymentMutation() {
  const { mutate, mutateAsync } = useMutation({
    mutationFn: createPayment,
  })

  return {
    registerPayment: mutate,
    registerPaymentAsync: mutateAsync,
  }
}
