import { toast } from 'react-toastify'
import { createProduct } from '@/service/products.service'
import { Product } from '@/types/product'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useProductMutation() {
  const queryClient = useQueryClient()

  const { mutate, mutateAsync } = useMutation({
    mutationFn: (data: Partial<Product>) => createProduct(data),
    onSuccess: () => {
      toast.success('Producto registrado correctament')

      queryClient.invalidateQueries({
        queryKey: ['list-products'],
      })
    },
    onError: e => {
      toast.error(`Error creando producto ${e.message}`)
    },
  })

  return {
    saveProduct: mutate,
    saveProductAsync: mutateAsync,
  }
}
