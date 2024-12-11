import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createOrder } from '@/service/order.service'
import { CreateOrder } from '@/types/order'

export function useOrderMutation() {
  const queryClient = useQueryClient()

  const { mutate, mutateAsync } = useMutation({
    mutationFn: (data: CreateOrder) => createOrder(data),
    onSuccess: () => {
      toast.success('Orden creada correctament')

      queryClient.invalidateQueries({
        queryKey: ['list-order'],
      })
    },
    onError: () => {
      toast.error('Error al crear orden')
    },
  })

  return {
    createOrder: mutate,
    createOrderAsync: mutateAsync,
  }
}
