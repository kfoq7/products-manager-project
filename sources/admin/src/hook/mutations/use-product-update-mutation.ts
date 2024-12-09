import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProduct } from '@/service/products.service'
import { Product } from '@/types/product'

export function useProductUpdateMutation() {
  const queryClient = useQueryClient()

  const { mutate, mutateAsync } = useMutation({
    mutationFn: (data: Partial<Product>) => updateProduct(data),
    onSuccess: () => {
      toast.success('Producto actualizado correctament')

      queryClient.invalidateQueries({
        queryKey: ['list-products'],
      })
    },
    onError: e => {
      toast.error(`Error creando producto ${e.message}`)
    },
  })

  return {
    updateProduct: mutate,
    updateProductAsync: mutateAsync,
  }
}
