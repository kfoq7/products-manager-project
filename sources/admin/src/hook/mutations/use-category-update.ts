import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateCategory } from '@/service/category.service'
import { Category } from '@/types/product'
import { toast } from 'react-toastify'

export function useCategoryUpdate() {
  const queryClient = useQueryClient()

  const { mutate, mutateAsync } = useMutation({
    mutationFn: (data: Category) => updateCategory(data),
    onSuccess: () => {
      toast.success('Categoría guardada exitosamente.')

      queryClient.invalidateQueries({
        queryKey: ['list-category'],
      })
    },
    onError: () => {
      toast.error('Error al actualizar category.')
    },
  })

  return {
    updateCategory: mutate,
    updateCategoryAsync: mutateAsync,
  }
}
